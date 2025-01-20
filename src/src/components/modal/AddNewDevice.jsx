import React, { useState } from "react";
import { deviceCategories, devices } from "../../constants/devices";
import { List, ListItem } from "@material-tailwind/react";
import mobileMockup from "../../assets/mockups/mobile.png";
import tabletMockup from "../../assets/mockups/tablet.png";
import computerMockup from "../../assets/mockups/computer.png";
import { toast } from "react-toastify";

function AddNewDevice({
  showAddDeviceModal,
  setShowAddDeviceModal,
  addDevice,
}) {
  const [filteredDevices, setFilteredDevices] = useState([
    ...devices.mobile,
    ...devices.tablets,
    ...devices.computers,
  ]);

  const handleDeviceFilter = (category) => {
    // Correct the category key by converting plural to singular
    const categoryMap = {
      all: "all",
      mobiles: "mobile",
      tablets: "tablets",
      computers: "computers",
    };

    if (category === "all") {
      setFilteredDevices([
        ...devices.mobile,
        ...devices.tablets,
        ...devices.computers,
      ]);
    } else {
      setFilteredDevices(devices[categoryMap[category]]);
    }
  };

  const handleContainerClick = (e) => {
    setShowAddDeviceModal(false);
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleAddNewDevice = (device) => {
    addDevice(device);
    toast.success("Device added successfully!");
    setShowAddDeviceModal(false);
  };

  return (
    <div
      className="fixed top-0 left-0 h-full w-full bg-black/30 z-[99999] flex justify-center items-center"
      onClick={handleContainerClick}
    >
      <div
        className="w-[1200px] max-h-[700px] h-full bg-white rounded-xl shadow-xl flex overflow-hidden py-5"
        onClick={handleModalContentClick}
      >
        <div className="w-full max-w-[25%] h-full p-5">
          <h3 className="text-md text-primary-text">Templates</h3>
          <div className="mt-3">
            {deviceCategories.map((category) => (
              <List key={category.id} className="p-1 m-0">
                <ListItem onClick={() => handleDeviceFilter(category.id)}>
                  {category.name}
                </ListItem>
              </List>
            ))}
          </div>
        </div>
        <div className="px-5 w-full h-full overflow-y-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-md text-primary-text font-semibold">
              Select Device Template
            </h3>
            <p>{filteredDevices.length} Templates</p>
          </div>
          <div className="w-full h-full grid grid-cols-3 mt-5 gap-5 ">
            {filteredDevices.map((device, key) => (
              <div
                className="h-[300px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer rounded-xl hover:scale-105 hover:bg-gray-200  transition-all duration-300"
                key={key}
                onClick={() => handleAddNewDevice(device)}
              >
                <div>
                  {device.category === "Mobile" ? (
                    <img src={mobileMockup} className="w-[200px]" alt="" />
                  ) : device.category === "Tablet" ? (
                    <img src={tabletMockup} className="w-[200px]" alt="" />
                  ) : (
                    <img src={computerMockup} className="w-[200px]" alt="" />
                  )}
                </div>
                <span className="mt-2 text-center">{device.name}</span>
                <span className="mt-2 text-center text-sm text-gray-600">
                  {device.width} x {device.height} px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewDevice;
