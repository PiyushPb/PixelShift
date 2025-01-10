import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { CiMobile3 } from "react-icons/ci";
import { GrPersonalComputer } from "react-icons/gr";
import { MdTabletMac } from "react-icons/md";
import { injectVisionStyles } from "../../utils/visionStyles";

const DeviceRenderer = ({
  device,
  url,
  scale,
  onResize,
  iframeRef,
  onScroll,
  onClick,
  visionDifficulty,
}) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const [isScreenshotInProgress, setIsScreenshotInProgress] = useState(false);
  const containerRef = useRef(null);
  const iframeInternalRef = useRef(null);

  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    } else {
      setIframeSrc("");
    }
  }, [url]);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      onResize(width, height);
    }
  }, [scale]);

  useEffect(() => {
    const iframe = iframeInternalRef.current;
    const iframeDoc =
      iframe?.contentDocument || iframe?.contentWindow?.document;

    if (iframeDoc) {
      const applyStyles = () => {
        injectVisionStyles(iframeDoc, visionDifficulty);
      };

      const handleScroll = () => {
        const scrollTop = iframeDoc.documentElement.scrollTop;
        const scrollLeft = iframeDoc.documentElement.scrollLeft;
        onScroll(scrollTop, scrollLeft);
      };

      const handleClick = (event) => {
        const { clientX, clientY, target } = event;
        const tagName = target.tagName;
        onClick(clientX, clientY, tagName);
      };

      iframe.onload = applyStyles;
      applyStyles();

      iframeDoc.addEventListener("scroll", handleScroll);
      iframeDoc.addEventListener("click", handleClick);

      return () => {
        iframeDoc.removeEventListener("scroll", handleScroll);
        iframeDoc.removeEventListener("click", handleClick);
      };
    }
  }, [onScroll, onClick, visionDifficulty]);

  const takeViewportScreenshot = async () => {
    setIsScreenshotInProgress(true);

    try {
      const iframe = iframeInternalRef.current;
      if (!iframe) throw new Error("Iframe not accessible");

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const iframeBody = iframeDoc.body;

      const scrollTop = iframeDoc.documentElement.scrollTop;
      const scrollLeft = iframeDoc.documentElement.scrollLeft;

      const canvas = await html2canvas(iframeBody, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#fff",
        width: iframe.offsetWidth,
        height: iframe.offsetHeight,
        x: scrollLeft,
        y: scrollTop,
      });

      const screenshotDataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = screenshotDataUrl;
      link.download = `${device.name}-viewport-screenshot.png`;
      link.click();
    } catch (error) {
      console.error("Error taking viewport screenshot:", error);
    } finally {
      setIsScreenshotInProgress(false);
    }
  };

  const takeFullScreenshot = async () => {
    setIsScreenshotInProgress(true);

    try {
      const iframe = iframeInternalRef.current;
      if (!iframe) throw new Error("Iframe not accessible");

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const iframeBody = iframeDoc.body;

      const canvas = await html2canvas(iframeBody, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#fff",
        width: iframeDoc.documentElement.scrollWidth,
        height: iframeDoc.documentElement.scrollHeight,
      });

      const screenshotDataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = screenshotDataUrl;
      link.download = `${device.name}-full-screenshot.png`;
      link.click();
    } catch (error) {
      console.error("Error taking full screenshot:", error);
    } finally {
      setIsScreenshotInProgress(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: `${device.width}px`,
        height: `${device.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "relative",
      }}
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-primary-text text-[12px]">{device.name}</h3>
        <div className="flex items-center gap-1">
          <span className="text-secondary-text text-[12px]">
            @ {device.width} x {device.height} px
          </span>
          <div className="ml-2">
            {device.category === "Mobile" && (
              <CiMobile3 className="text-primary-text" />
            )}
            {device.category === "Tablet" && (
              <MdTabletMac className="text-primary-text" />
            )}
            {device.category === "Computer" && (
              <GrPersonalComputer className="text-primary-text" />
            )}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <button
          onClick={takeViewportScreenshot}
          className="mr-2 px-2 py-1 bg-blue-500 text-white text-sm rounded"
        >
          Viewport Screenshot
        </button>
        <button
          onClick={takeFullScreenshot}
          className="px-2 py-1 bg-green-500 text-white text-sm rounded"
        >
          Full Screen Screenshot
        </button>
      </div>

      {isScreenshotInProgress && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          Taking Screenshot...
        </div>
      )}

      <div
        style={{
          width: `${device.width}px`,
          height: `${device.height}px`,
          border: "1px solid #ccc",
          borderRadius: "5px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            title={device.name}
            ref={(ref) => {
              iframeInternalRef.current = ref;
              if (iframeRef) iframeRef(ref);
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${device.width}px`,
              height: `${device.height}px`,
              border: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceRenderer;
