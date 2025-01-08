import React from "react";
import { IoCloseCircleOutline, IoCameraOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { LuSettings2, LuMousePointerClick } from "react-icons/lu";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { LiaLaptopSolid } from "react-icons/lia";
import { PiMouseScroll } from "react-icons/pi";

function HeaderTools({
  resizePercentage,
  setResizePercentage,
  isScrollInSync,
  setIsScrollInSync,
  isDevConsoleVisible,
  setIsDevCOnsoleVisible,
}) {
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
      {/* TODO : Add syncClick event in future */}
      {/* <LuMousePointerClick size={20} className="text-gray-400" /> */}
      <div className="relative">
        <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px] select-none">
          2
        </span>
        <LiaLaptopSolid size={20} className="text-gray-400" />
      </div>
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
      <LuSettings2 size={20} className="text-gray-400" />
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
