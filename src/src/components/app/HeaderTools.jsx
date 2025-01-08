import React from "react";
import { IoCloseCircleOutline, IoCameraOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { LuSettings2, LuMousePointerClick } from "react-icons/lu";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { LiaLaptopSolid } from "react-icons/lia";
import { PiMouseScroll } from "react-icons/pi";

function HeaderTools({ resizePercentage, setResizePercentage }) {
  const handleResizeChange = (event) => {
    setResizePercentage(event.target.value);
  };

  return (
    <div className="flex flex-row justify-normal items-center gap-2 ml-5">
      <PiMouseScroll size={20} className="text-gray-400" />
      <LuMousePointerClick size={20} className="text-gray-400" />
      <div className="relative">
        <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px]">
          2
        </span>
        <LiaLaptopSolid size={20} className="text-gray-400" />
      </div>
      <IoCameraOutline size={20} className="text-gray-400" />
      <TbLayoutSidebarRightFilled size={20} className="text-gray-400" />
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
      <FaGithub size={20} className="text-gray-400" />
      <LuSettings2 size={20} className="text-gray-400" />
      <IoCloseCircleOutline size={20} className="text-gray-400" />
    </div>
  );
}

export default HeaderTools;
