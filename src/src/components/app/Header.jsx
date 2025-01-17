import React from "react";
import { GoArrowLeft, GoArrowRight, GoHome } from "react-icons/go";
import { MdOutlineRefresh } from "react-icons/md";
import HeaderTools from "./HeaderTools";

function Header({
  url,
  resizePercentage,
  setResizePercentage,
  isScrollInSync,
  setIsScrollInSync,
  isDevConsoleVisible,
  setIsDevConsoleVisible,
  isSettingsVisible,
  setIsSettingsVisible,
  selectedDevices,
  removeDevice,
}) {
  return (
    <div className="w-full flex justify-normal items-center p-3 bg-secondary-background">
      <div className="flex justify-start items-center gap-2">
        <div>
          <GoArrowLeft size={20} className="text-gray-400" />
        </div>
        <div>
          <GoArrowRight size={20} className="text-gray-400" />
        </div>
        <div className="">
          <MdOutlineRefresh size={20} className="text-gray-400" />
        </div>
      </div>
      <div
        className={`w-full ml-3 px-4 py-2 text-[14px] border-[1px] border-solid border-[#E5E7EB] rounded-full`}
      >
        <input
          type="text"
          placeholder="Enter the URL"
          className={`w-full border-none outline-none bg-transparent`}
          value={url}
          disabled="true"
        />
      </div>
      <HeaderTools
        resizePercentage={resizePercentage}
        setResizePercentage={setResizePercentage}
        isScrollInSync={isScrollInSync}
        setIsScrollInSync={setIsScrollInSync}
        isDevConsoleVisible={isDevConsoleVisible}
        setIsDevCOnsoleVisible={setIsDevConsoleVisible}
        isSettingsVisible={isSettingsVisible}
        setIsSettingsVisible={setIsSettingsVisible}
        selectedDevices={selectedDevices}
        removeDevice={removeDevice}
      />
    </div>
  );
}

export default Header;
