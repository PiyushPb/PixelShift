import React from "react";
import { IoCloseCircleOutline, IoCameraOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { LuSettings2, LuMousePointerClick } from "react-icons/lu";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { LiaLaptopSolid } from "react-icons/lia";
import { PiMouseScroll } from "react-icons/pi";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FaArrowsUpDown } from "react-icons/fa6";

function HeaderTools({
  resizePercentage,
  setResizePercentage,
  isScrollInSync,
  setIsScrollInSync,
  isDevConsoleVisible,
  setIsDevCOnsoleVisible,
  isSettingsVisible,
  setIsSettingsVisible,
  selectedDevices,
  removeDevice, // Receive removeDevice function
}) {
  function selectedDevicesCount() {
    const devicesCount = selectedDevices.length;
    return devicesCount > 9 ? "9+" : devicesCount;
  }

  const handleResizeChange = (event) => {
    setResizePercentage(event.target.value);
  };

  return (
    <div className="flex flex-row justify-normal items-center gap-2 ml-5">
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
      {/* Selected Devices */}
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
                  <div className="flex items-center gap-2">
                    {/* Close button for each device */}
                    <IoCloseCircleOutline
                      size={20}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => removeDevice(device.id)} // Pass the specific device ID
                    />
                  </div>
                </MenuItem>
              ))}
            </div>
            <Button className="w-full text-[12px] font-normal normal-case font-family-manrope mt-3">
              Add New Device
            </Button>
          </MenuList>
        </Menu>
      </div>
      {/* Camera */}
      <IoCameraOutline size={20} className="text-gray-400" />

      {/* Toggle SideDevConsole */}
      <div
        className={`w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer ${
          isDevConsoleVisible ? "bg-primary" : ""
        }`}
        onClick={() => setIsDevCOnsoleVisible(!isDevConsoleVisible)}
      >
        <TbLayoutSidebarRightFilled
          size={20}
          className={`${isDevConsoleVisible ? "text-white" : "text-gray-400"}`}
        />
      </div>
      <div className="flex items-center gap-2">
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
        <span>{resizePercentage}%</span>
      </div>
      {/* Redirect user to PixelShift Github */}
      <a
        href="https://github.com/PiyushPb/PixleShift"
        className="w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer group hover:bg-primary dark:hover:bg-primary-dark transition-all duration-200"
        rel="noopener noreferrer"
        target="blank"
      >
        <FaGithub size={20} className="text-gray-400 group-hover:text-white" />
      </a>
      {/* Toggle settings */}
      <div
        className={`w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer ${
          isSettingsVisible ? "bg-primary" : ""
        }`}
        onClick={() => setIsSettingsVisible(!isSettingsVisible)}
      >
        <LuSettings2
          size={20}
          className={`${isSettingsVisible ? "text-white" : "text-gray-400"}`}
        />
      </div>
      {/* Toggle close the extension */}
      <div
        className="w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer group hover:bg-red-400 transition-all duration-200"
        onClick={() => {
          location.reload();
        }}
      >
        <IoCloseCircleOutline
          size={20}
          className="text-gray-400 group-hover:text-white"
        />
      </div>
    </div>
  );
}

export default HeaderTools;
