import React from "react";
import { IoSettingsOutline, IoCameraOutline } from "react-icons/io5";
import { PiDevices } from "react-icons/pi";
import { HiOutlineCodeBracket } from "react-icons/hi2";

function DeviceTools() {
  return (
    <div className="flex justify-end items-center mb-2 gap-2 w-full">
      <IoSettingsOutline className="text-primary" />
      <IoCameraOutline className="text-primary" />
      <div className="relative">
        <PiDevices className="text-primary" />
        <div className="absolute h-[6px] w-[6px] bg-red-400 rounded-full top-0 left-0"></div>
      </div>
      <HiOutlineCodeBracket className="text-primary" />
    </div>
  );
}

export default DeviceTools;
