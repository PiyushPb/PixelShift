import React, { useEffect, useRef, useState } from "react";
import { setupIframeListeners } from "../../utils/iframeUtils";

const DeviceRenderer = ({
  device,
  url,
  scale,
  onResize,
  iframeRef,
  onScroll,
  onClick,
  visionDifficulty,
  settings, // Receive the settings object directly
}) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const containerRef = useRef(null);
  const iframeInternalRef = useRef(null);

  // Destructure the settings object to access isCSSEnabled and isJSEnabled
  const { isCSSEnabled, isJSEnabled } = settings;

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  // Effect to log visionDifficulty
  useEffect(() => {
    console.log(visionDifficulty);
  }, [visionDifficulty]);

  // Effect to set iframe source URL
  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    } else {
      setIframeSrc("");
    }
  }, [url]);

  // Effect to handle resizing
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      onResize(width, height);
    }
  }, [scale]);

  // Effect to set iframe listeners
  useEffect(() => {
    const iframe = iframeInternalRef.current;
    const cleanup = setupIframeListeners(
      iframe,
      onScroll,
      onClick,
      visionDifficulty
    );
    return cleanup;
  }, [onScroll, onClick, visionDifficulty]);

  // Effect to remove CSS or JS when disabled and reload when enabled
  useEffect(() => {
    if (iframeInternalRef.current && iframeInternalRef.current.contentWindow) {
      const iframeDocument = iframeInternalRef.current.contentWindow.document;

      // Remove CSS if not enabled
      if (!isCSSEnabled) {
        const styleTags = iframeDocument.querySelectorAll("style");
        styleTags.forEach((styleTag) => styleTag.remove());
      } else {
        // Reload iframe when CSS is enabled again
        const iframe = iframeInternalRef.current;
        iframe.contentWindow.location.reload();
      }

      // Remove JS if not enabled
      if (!isJSEnabled) {
        const scriptTags = iframeDocument.querySelectorAll("script");
        scriptTags.forEach((scriptTag) => scriptTag.remove());
      }
    }
  }, [isCSSEnabled, isJSEnabled]);

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
      <div className="flex flex-row justify-between items-center mb-1">
        <h3 className="text-primary-text text-[12px]">{device.name}</h3>
        <span className="text-secondary-text text-[12px]">
          @ {device.width} x {device.height} px
        </span>
      </div>
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
