import React, { useCallback, useMemo, useState, useRef } from "react";
import { devices } from "../../constants/devices";
import DeviceRenderer from "../deviceRender/DeviceRenderer";
import DeviceTools from "../deviceRender/DeviceTools";
import {
  takeViewportScreenshot,
  takeFullScreenshot,
} from "../../utils/screenshotUtils";

function Body({
  url,
  theme,
  resizePercentage,
  isScrollInSync,
  setIsScrollInSync,
  selectedDevices,
}) {
  const scale = useMemo(() => resizePercentage / 100, [resizePercentage]);
  const [deviceDimensions, setDeviceDimensions] = useState({});
  const iframeRefs = useRef({});
  const [visionDifficulties, setVisionDifficulties] = useState({});

  const [deviceSettings, setDeviceSettings] = useState(
    selectedDevices.reduce((acc, device) => {
      acc[device.id] = {
        isCSSEnabled: true, // Default to CSS enabled
        isJSEnabled: true, // Default to JS enabled
      };
      return acc;
    }, {})
  );

  const handleResize = useCallback((deviceId, width, height) => {
    setDeviceDimensions((prevDimensions) => ({
      ...prevDimensions,
      [deviceId]: { width, height },
    }));
  }, []);

  const handleScrollSync = useCallback(
    (scrolledDeviceId, scrollTop, scrollLeft) => {
      if (!isScrollInSync) return;

      Object.entries(iframeRefs.current).forEach(([deviceId, iframeRef]) => {
        if (deviceId !== scrolledDeviceId && iframeRef?.contentWindow) {
          const iframeDoc = iframeRef.contentWindow.document;
          iframeDoc.documentElement.scrollTo(scrollLeft, scrollTop);
        }
      });
    },
    [isScrollInSync]
  );

  const takeScreenshot = async (device, type) => {
    try {
      const iframeRef = iframeRefs.current[device.id];
      if (!iframeRef) {
        console.warn(`Iframe ref not found for device: ${device.name}`);
        return;
      }
      console.log(
        `Taking ${type === "viewport" ? "viewport" : "full"} screenshot for: ${
          device.name
        }`
      );

      if (type === "viewport") {
        await takeViewportScreenshot(iframeRef, device);
      } else {
        await takeFullScreenshot(iframeRef, device);
      }
    } catch (error) {
      console.error(
        `Error taking ${type} screenshot for: ${device.name}`,
        error
      );
    }
  };

  const updateVisionDifficulty = (deviceId, difficulty) => {
    setVisionDifficulties((prev) => ({
      ...prev,
      [deviceId]: difficulty,
    }));
  };

  const toggleDeviceSetting = (deviceId, settingKey) => {
    setDeviceSettings((prevState) => {
      const newState = {
        ...prevState,
        [deviceId]: {
          ...prevState[deviceId],
          [settingKey]: !prevState[deviceId]?.[settingKey],
        },
      };

      console.log(newState[deviceId]); // Log only the object for the specific device
      return newState;
    });
  };

  return (
    <div className="flex w-full h-full overflow-auto">
      <div className="w-full flex flex-wrap gap-5 p-4 pb-10 h-full scroll-container">
        {selectedDevices.map((device) => {
          const dimensions = deviceDimensions[device.id] || {
            width: device.width,
            height: device.height,
          };

          return (
            <div
              key={device.id}
              className="relative mb-10"
              style={{
                width: `${dimensions.width * scale}px`,
                height: `${dimensions.height * scale}px`,
              }}
            >
              <div className="flex flex-col">
                <DeviceTools
                  theme={theme}
                  device={device}
                  onViewportScreenshot={() =>
                    takeScreenshot(device, "viewport")
                  }
                  onFullScreenshot={() => takeScreenshot(device, "full")}
                  setVisionDifficulty={(difficulty) =>
                    updateVisionDifficulty(device.id, difficulty)
                  }
                  settings={deviceSettings[device.id]} // Pass device settings
                  toggleDeviceSetting={(settingKey) =>
                    toggleDeviceSetting(device.id, settingKey)
                  }
                />
                <DeviceRenderer
                  device={device}
                  url={url}
                  theme={theme}
                  scale={scale}
                  iframeRef={(ref) => (iframeRefs.current[device.id] = ref)}
                  onResize={(width, height) =>
                    handleResize(device.id, width, height)
                  }
                  onScroll={(scrollTop, scrollLeft) =>
                    handleScrollSync(device.id, scrollTop, scrollLeft)
                  }
                  visionDifficulty={visionDifficulties[device.id] || "default"}
                  settings={deviceSettings[device.id]} // Pass device settings
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
