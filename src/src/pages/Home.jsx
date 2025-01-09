import React, { useEffect, useState } from "react";
import Header from "../components/app/Header";
import Body from "../components/app/Body";
import DevConsole from "../components/app/DevConsole";
import Settings from "./Settings";

function Home() {
  const [defaultUrl, setDefaultUrl] = useState("");
  const [url, setUrl] = useState("");
  const [isConsoleVisible, setConsoleVisible] = useState(false);
  const [resizePercentage, setResizePercentage] = useState(100);

  const [isScrollInSync, setIsScrollInSync] = useState(false);
  const [isDevConsoleVisible, setIsDevCOnsoleVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    // const website_url = window.location.href;
    const website_url = "http://localhost:5173/test";
    setDefaultUrl(website_url);
    setUrl(website_url);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <Header
        url={url}
        resizePercentage={resizePercentage}
        setResizePercentage={setResizePercentage}
        isScrollInSync={isScrollInSync}
        setIsScrollInSync={setIsScrollInSync}
        isDevConsoleVisible={isDevConsoleVisible}
        setIsDevCOnsoleVisible={setIsDevCOnsoleVisible}
        isSettingsVisible={isSettingsVisible}
        setIsSettingsVisible={setIsSettingsVisible}
      />
      <div className="w-full h-full flex flex-row overflow-hidden">
        {isSettingsVisible ? (
          <Settings />
        ) : (
          <>
            <Body
              url={url}
              resizePercentage={resizePercentage}
              isScrollInSync={isScrollInSync}
              setIsScrollInSync={setIsScrollInSync}
            />
            {/* {isDevConsoleVisible && <DevConsole />} */}
            <div
              className={`${
                isDevConsoleVisible ? "block max-w-[1000px] " : "hidden"
              }`}
            >
              <DevConsole />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
