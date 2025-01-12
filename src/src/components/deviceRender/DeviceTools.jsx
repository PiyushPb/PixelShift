import React from "react";
import { IoSettingsOutline, IoCameraOutline } from "react-icons/io5";
import { PiDevices } from "react-icons/pi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

function DeviceTools({ onViewportScreenshot, onFullScreenshot }) {
  return (
    <div className="flex justify-end items-center mb-2 w-full">
      <div className="flex justify-end items-center gap-2">
        <IoSettingsOutline className="text-primary-text" />
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <div>
              <IoCameraOutline className="text-primary-text cursor-pointer" />
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={onViewportScreenshot}>
              <p>Viewport Screenshot</p>
            </MenuItem>
            <MenuItem onClick={onFullScreenshot}>
              <p>Full Screen Screenshot</p>
            </MenuItem>
          </MenuList>
        </Menu>
        <PiDevices className="text-primary-text" />
        <HiOutlineCodeBracket className="text-primary-text" />
      </div>
    </div>
  );
}

export default DeviceTools;
