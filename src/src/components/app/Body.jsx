import React, { useCallback, useMemo, useState, useRef } from "react";
import { devices } from "../../constants/devices";
import DeviceRenderer from "../deviceRender/DeviceRenderer";
import DeviceTools from "../deviceRender/DeviceTools";

function Body({
  url,
  theme,
  resizePercentage,
  isScrollInSync,
  setIsScrollInSync,
}) {
  const selectedDevices = [
    devices.mobile[0],
    devices.mobile[3],
    devices.tablets[0],
    devices.computers[0],
    devices.computers[4],
  ];

  const scale = useMemo(() => resizePercentage / 100, [resizePercentage]);

  const [deviceDimensions, setDeviceDimensions] = useState({});

  const iframeRefs = useRef({}); // Store refs for all iframes

  const handleResize = useCallback((deviceName, width, height) => {
    setDeviceDimensions((prevDimensions) => ({
      ...prevDimensions,
      [deviceName]: { width, height },
    }));
  }, []);

  const handleScrollSync = useCallback(
    (scrolledDeviceName, scrollTop, scrollLeft) => {
      if (!isScrollInSync) return;

      Object.entries(iframeRefs.current).forEach(([deviceName, iframeRef]) => {
        if (deviceName !== scrolledDeviceName && iframeRef?.contentWindow) {
          const iframeDoc = iframeRef.contentWindow.document;
          iframeDoc.documentElement.scrollTo(scrollLeft, scrollTop); // Synchronize scroll position
        }
      });
    },
    [isScrollInSync]
  );

  return (
    <div className="flex w-full h-full overflow-auto">
      {/* Container for all device renderings */}
      <div className="w-full flex flex-wrap gap-5 p-4 pb-10 h-full scroll-container">
        {selectedDevices.map((device) => {
          const dimensions = deviceDimensions[device.name] || {
            width: device.width,
            height: device.height,
          };

          return (
            <div
              key={device.name}
              className="relative mb-10"
              style={{
                width: `${dimensions.width * scale}px`,
                height: `${dimensions.height * scale}px`,
              }}
            >
              <div className="flex flex-col">
                <DeviceTools theme={theme} scale={scale} />
                <DeviceRenderer
                  device={device}
                  url={url}
                  theme={theme}
                  scale={scale}
                  iframeRef={(ref) => (iframeRefs.current[device.name] = ref)}
                  onResize={(width, height) =>
                    handleResize(device.name, width, height)
                  }
                  onScroll={(scrollTop, scrollLeft) =>
                    handleScrollSync(device.name, scrollTop, scrollLeft)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
