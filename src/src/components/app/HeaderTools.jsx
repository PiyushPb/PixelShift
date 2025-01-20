import React, { useEffect } from "react";
import { IoCloseCircleOutline, IoCameraOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { LiaLaptopSolid } from "react-icons/lia";
import { PiMouseScroll } from "react-icons/pi";
import { LuGalleryHorizontalEnd } from "react-icons/lu";

import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
} from "@material-tailwind/react";

function HeaderTools({
  resizePercentage,
  setResizePercentage,
  isScrollInSync,
  setIsScrollInSync,
  isDevConsoleVisible,
  setIsDevCOnsoleVisible,
  selectedDevices,
  removeDevice,
  setShowAddDeviceModal,
  verticalOrientation,
  setVerticalOrientation,
}) {
  // Helper function to count selected devices
  const selectedDevicesCount = () =>
    selectedDevices.length > 9 ? "9+" : selectedDevices.length;

  // Handle resizing percentage change
  const handleResizeChange = (event) => {
    setResizePercentage(event.target.value);
  };

  const handleAboutClick = () => {
    // Get the extension ID dynamically using chrome.runtime.id
    const extensionId = chrome.runtime.id;

    if (extensionId) {
      // Open the about.html page in a new tab within the extension's context
      window.open(`chrome-extension://${extensionId}/about.html`, "_blank");
    } else {
      console.error("Extension ID is not available");
    }
  };

  return (
    <div className="flex flex-row justify-normal items-center gap-2 ml-5">
      {/* Sync Scroll Toggle */}
      <Tooltip content="Toggle Scroll Sync">
        <div
          className={`w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer ${
            isScrollInSync ? "bg-primary" : ""
          }`}
          onClick={() => setIsScrollInSync(!isScrollInSync)}
        >
          <PiMouseScroll
            size={20}
            className={`${isScrollInSync ? "text-white" : "text-gray-400"}`}
          />
        </div>
      </Tooltip>

      {/* Selected Devices */}
      <Tooltip content="Selected Devices">
        <div>
          <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
            <MenuHandler>
              <div className="relative">
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px] select-none">
                  {selectedDevicesCount()}
                </span>
                <LiaLaptopSolid size={20} className="text-gray-400" />
              </div>
            </MenuHandler>
            <MenuList className="w-[300px]">
              <div className="border-none outline-none focus:outline-none max-h-[500px] overflow-y-auto">
                {selectedDevices.map((device) => (
                  <MenuItem
                    key={device.id}
                    className="flex justify-between items-center gap-2"
                  >
                    <span>{device.name}</span>
                    <IoCloseCircleOutline
                      size={20}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => removeDevice(device.id)}
                    />
                  </MenuItem>
                ))}
              </div>
              <Button
                className="w-full text-[12px] font-normal normal-case font-family-manrope mt-3"
                onClick={() => setShowAddDeviceModal(true)}
              >
                Add New Device
              </Button>
            </MenuList>
          </Menu>
        </div>
      </Tooltip>

      {/* Dev Console Toggle */}
      <Tooltip content="Toggle Dev Console">
        <div
          className={`w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer ${
            isDevConsoleVisible ? "bg-primary" : ""
          }`}
          onClick={() => setIsDevCOnsoleVisible(!isDevConsoleVisible)}
        >
          <TbLayoutSidebarRightFilled
            size={20}
            className={`${
              isDevConsoleVisible ? "text-white" : "text-gray-400"
            }`}
          />
        </div>
      </Tooltip>

      {/* Toggle view */}
      <Tooltip
        content={`${
          verticalOrientation ? "Toggle Vertical" : "Toggle Horizontal"
        } View`}
      >
        <div
          className="w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer group hover:bg-primary dark:hover:bg-primary-dark transition-all duration-200"
          onClick={() => setVerticalOrientation(!verticalOrientation)}
        >
          <LuGalleryHorizontalEnd
            size={20}
            className={`text-gray-400 group-hover:text-white ${
              !verticalOrientation ? "rotate-90" : ""
            }`}
          />
        </div>
      </Tooltip>

      {/* Resize Percentage Slider */}
      <div className="flex items-center gap-2">
        <Tooltip content="Adjust Resize Percentage">
          <input
            type="range"
            min="50"
            max="100"
            step="10"
            className="w-20 h-2 bg-gray-300 rounded-full"
            style={{ outline: "none" }}
            value={resizePercentage}
            onChange={handleResizeChange}
          />
        </Tooltip>
        <span>{resizePercentage}%</span>
      </div>

      {/* GitHub Link */}
      <Tooltip content="Open GitHub Repository">
        <a
          href="https://github.com/PiyushPb/PixelShift"
          className="w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer group hover:bg-primary dark:hover:bg-primary-dark transition-all duration-200"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub
            size={20}
            className="text-gray-400 group-hover:text-white"
          />
        </a>
      </Tooltip>

      {/* Settings Menu */}
      <Tooltip content="Open Settings">
        <div>
          <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
            <MenuHandler>
              <div>
                <LuSettings2 size={20} className="text-gray-400" />
              </div>
            </MenuHandler>
            <MenuList className="w-[300px]">
              <MenuItem
                className="flex justify-between items-center gap-2"
                onClick={handleAboutClick}
              >
                <span>About PixelShift</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Tooltip>

      {/* Reload Extension */}
      <Tooltip content="Close Extension">
        <div
          className="w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer group hover:bg-red-400 transition-all duration-200"
          onClick={() => location.reload()}
        >
          <IoCloseCircleOutline
            size={20}
            className="text-gray-400 group-hover:text-white"
          />
        </div>
      </Tooltip>
    </div>
  );
}

export default HeaderTools;
