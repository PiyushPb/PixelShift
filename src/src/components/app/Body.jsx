import React, { useCallback, useMemo, useState } from "react";
import { devices } from "../../constants/devices";
import DeviceRenderer from "../deviceRender/DeviceRenderer";
import DeviceTools from "../deviceRender/DeviceTools";

function Body({ url, theme, resizePercentage }) {
  const selectedDevices = [
    devices.mobile[0],
    devices.mobile[3],
    devices.tablets[0],
    devices.computers[0],
    devices.computers[4],
  ];

  const scale = useMemo(() => resizePercentage / 100, [resizePercentage]);

  // State to store device dimensions dynamically
  const [deviceDimensions, setDeviceDimensions] = useState({});

  // Handle resizing of a device, updating its dimensions in state
  const handleResize = useCallback((deviceName, width, height) => {
    setDeviceDimensions((prevDimensions) => ({
      ...prevDimensions,
      [deviceName]: { width, height },
    }));
  }, []);

  return (
    <div className="flex w-full h-full pb-5">
      {/* Container for all device renderings with auto overflow and custom scrollbar */}
      <div className="flex flex-wrap gap-5 p-4 pb-10 h-full scroll-container">
        {selectedDevices.map((device) => {
          // Get device dimensions or fallback to the default dimensions
          const dimensions = deviceDimensions[device.name] || {
            width: device.width,
            height: device.height,
          };

          return (
            <div
              key={device.name}
              className="relative mb-10"
              style={{
                width: `${dimensions.width * scale}px`, // Apply scaling here
                height: `${dimensions.height * scale}px`, // Apply scaling here
              }}
            >
              {/* Render device tools and device renderer */}
              <div className="flex flex-col">
                <DeviceTools theme={theme} scale={scale} />
                <DeviceRenderer
                  device={device}
                  url={url}
                  theme={theme}
                  scale={scale}
                  onResize={(width, height) =>
                    handleResize(device.name, width, height)
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
