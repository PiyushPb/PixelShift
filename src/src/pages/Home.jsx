import React, { useEffect, useState } from "react";
import Header from "../components/app/Header";
import Body from "../components/app/Body";
import DevConsole from "../components/app/DevConsole";
import { devices } from "../constants/devices";

function Home() {
  const [defaultUrl, setDefaultUrl] = useState("");
  const [url, setUrl] = useState("");
  const [resizePercentage, setResizePercentage] = useState(100);

  const [isScrollInSync, setIsScrollInSync] = useState(false);
  const [isDevConsoleVisible, setIsDevConsoleVisible] = useState(false);
  // Make selectedDevices a state with IDs
  const [selectedDevices, setSelectedDevices] = useState([
    { ...devices.mobile[0], id: "mobile-1" },
    { ...devices.mobile[3], id: "mobile-4" },
    { ...devices.tablets[0], id: "tablet-1" },
    { ...devices.computers[0], id: "computer-1" },
    { ...devices.computers[4], id: "computer-5" },
  ]);

  useEffect(() => {
    const website_url = "http://localhost:5173/test";
    setDefaultUrl(website_url);
    setUrl(website_url);
  }, []);

  // Remove device by ID
  const removeDevice = (deviceId) => {
    setSelectedDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== deviceId)
    );
  };

  const addDevice = (device) => {
    const deviceId = Math.random().toString(36).substr(2, 9);
    setSelectedDevices((prevDevices) => [
      ...prevDevices,
      {
        ...device,
        id: deviceId,
      },
    ]);
  };

  return (
    <section className="w-full h-screen flex flex-col">
      <Header
        url={url}
        resizePercentage={resizePercentage}
        setResizePercentage={setResizePercentage}
        isScrollInSync={isScrollInSync}
        setIsScrollInSync={setIsScrollInSync}
        isDevConsoleVisible={isDevConsoleVisible}
        setIsDevConsoleVisible={setIsDevConsoleVisible}
        selectedDevices={selectedDevices}
        addDevice={addDevice}
        removeDevice={removeDevice}
      />
      <div className="w-full h-full flex flex-row overflow-hidden">
        <Body
          url={url}
          resizePercentage={resizePercentage}
          isScrollInSync={isScrollInSync}
          setIsScrollInSync={setIsScrollInSync}
          selectedDevices={selectedDevices}
        />
        <div
          className={`${
            isDevConsoleVisible ? "block max-w-[1000px] " : "hidden"
          }`}
        >
          <DevConsole />
        </div>
      </div>
    </section>
  );
}

export default Home;
