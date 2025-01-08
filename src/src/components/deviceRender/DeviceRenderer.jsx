import React, { useState, useEffect, useRef } from "react";
import { CiMobile3 } from "react-icons/ci";
import { GrPersonalComputer } from "react-icons/gr";
import { MdTabletMac } from "react-icons/md";

const DeviceRenderer = ({
  device,
  url,
  scale,
  onResize,
  iframeRef,
  onScroll,
  onClick,
}) => {
  const [iframeSrc, setIframeSrc] = useState("");
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

      iframeDoc.addEventListener("scroll", handleScroll);
      iframeDoc.addEventListener("click", handleClick);

      return () => {
        iframeDoc.removeEventListener("scroll", handleScroll);
        iframeDoc.removeEventListener("click", handleClick);
      };
    }
  }, [onScroll, onClick]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${device.width}px`,
        height: `${device.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
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

      {/* Device Frame */}
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
