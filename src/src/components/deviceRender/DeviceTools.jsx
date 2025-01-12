import React, { useState } from "react";
import { IoSettingsOutline, IoCameraOutline } from "react-icons/io5";
import { PiDevices } from "react-icons/pi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { VISION_DIFFICULTY_SETTINGS } from "../../utils/visionStyles";

function DeviceTools({
  device,
  onViewportScreenshot,
  onFullScreenshot,
  setVisionDifficulty,
  settings,
  toggleDeviceSetting, // Generalized toggle function for settings
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Control menu state

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setMenuOpen(true); // Keep the menu open when switching tabs
  };

  const handleMenuItemClick = (settingId) => {
    setVisionDifficulty(settingId);
    setMenuOpen(false); // Close the menu after selecting a setting
  };

  return (
    <div className="flex justify-end items-center mb-2 w-full">
      <div className="flex justify-end items-center gap-2">
        <Menu
          open={menuOpen} // Bind menu state to `menuOpen`
          onOpen={() => setMenuOpen(true)} // Keep track of menu being opened
          onClose={() => setMenuOpen(false)} // Keep track of menu being closed
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <div>
              <IoSettingsOutline
                className="text-primary-text cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu on icon click
              />
            </div>
          </MenuHandler>
          <MenuList className="w-[350px]">
            <div className="flex gap-2 pb-2 border-b border-gray-300">
              <button
                className={`text-primary-text px-3 py-1 rounded ${
                  activeTab === 0 ? "bg-gray-200" : ""
                }`}
                onClick={() => handleTabChange(0)}
              >
                Vision Settings
              </button>
              <button
                className={`text-primary-text px-3 py-1 rounded ${
                  activeTab === 1 ? "bg-gray-200" : ""
                }`}
                onClick={() => handleTabChange(1)}
              >
                Device Settings
              </button>
            </div>
            {activeTab === 0 && (
              <div className="pt-2">
                {VISION_DIFFICULTY_SETTINGS.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={() => handleMenuItemClick(setting.id)}
                  >
                    <p className="text-primary-text">{setting.name}</p>
                  </MenuItem>
                ))}
              </div>
            )}
            {activeTab === 1 && (
              <div className="h-[200px] overflow-y-auto pt-2">
                {/* Toggle CSS */}
                <div>
                  <p className="text-primary-text px-3 py-2">Enable CSS</p>
                  <Tabs value={settings.isCSSEnabled}>
                    <TabsHeader>
                      <Tab
                        value={true}
                        className="text-[12px]"
                        onClick={() =>
                          toggleDeviceSetting(device.name, "isCSSEnabled")
                        }
                      >
                        Enabled
                      </Tab>
                      <Tab
                        value={false}
                        className="text-[12px]"
                        onClick={() =>
                          toggleDeviceSetting(device.name, "isCSSEnabled")
                        }
                      >
                        Disabled
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div>
                {/* Toggle JS */}
                <div>
                  <p className="text-primary-text px-3 py-2">Enable JS</p>
                  <Tabs value={settings.isJSEnabled}>
                    <TabsHeader>
                      <Tab
                        value={true}
                        className="text-[12px]"
                        onClick={() =>
                          toggleDeviceSetting(device.name, "isJSEnabled")
                        }
                      >
                        Enabled
                      </Tab>
                      <Tab
                        value={false}
                        className="text-[12px]"
                        onClick={() =>
                          toggleDeviceSetting(device.name, "isJSEnabled")
                        }
                      >
                        Disabled
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
            )}
          </MenuList>
        </Menu>
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
        {/* <PiDevices className="text-primary-text" />
        <HiOutlineCodeBracket className="text-primary-text" /> */}
      </div>
    </div>
  );
}

export default DeviceTools;
