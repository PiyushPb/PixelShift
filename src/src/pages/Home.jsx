import React, { useEffect, useState } from "react";
import Header from "../components/app/Header";
import Body from "../components/app/Body";
import DevConsole from "../components/app/DevConsole";

function Home() {
  const [defaultUrl, setDefaultUrl] = useState("");
  const [url, setUrl] = useState("");
  const [isConsoleVisible, setConsoleVisible] = useState(false);
  const [resizePercentage, setResizePercentage] = useState(100);

  const [isScrollInSync, setIsScrollInSync] = useState(false);
  const [isDevConsoleVisible, setIsDevCOnsoleVisible] = useState(false);

  useEffect(() => {
    const website_url = window.location.href;
    setDefaultUrl(website_url);
    setUrl(website_url);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <Header
        resizePercentage={resizePercentage}
        setResizePercentage={setResizePercentage}
        isScrollInSync={isScrollInSync}
        setIsScrollInSync={setIsScrollInSync}
        isDevConsoleVisible={isDevConsoleVisible}
        setIsDevCOnsoleVisible={setIsDevCOnsoleVisible}
        url={url}
      />
      <div className="w-full h-full flex flex-row overflow-hidden">
        <Body
          url={url}
          resizePercentage={resizePercentage}
          isScrollInSync={isScrollInSync}
          setIsScrollInSync={setIsScrollInSync}
        />
        {isDevConsoleVisible && <DevConsole />}
      </div>
    </section>
  );
}

export default Home;
