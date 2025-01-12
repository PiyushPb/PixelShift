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
}) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const containerRef = useRef(null);
  const iframeInternalRef = useRef(null);

  useEffect(() => {
    console.log(visionDifficulty);
  }, [visionDifficulty]);

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
    const cleanup = setupIframeListeners(
      iframe,
      onScroll,
      onClick,
      visionDifficulty
    );
    return cleanup;
  }, [onScroll, onClick, visionDifficulty]);

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
