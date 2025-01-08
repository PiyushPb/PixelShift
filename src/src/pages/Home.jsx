import React, { useState } from "react";
import Header from "../components/app/Header";
import Body from "../components/app/Body";
import DevConsole from "../components/app/DevConsole";

function Home() {
  const [url, setUrl] = useState("https://example.com");
  const [isConsoleVisible, setConsoleVisible] = useState(false);
  const [resizePercentage, setResizePercentage] = useState(100);

  return (
    <section className="w-full h-screen flex flex-col">
      <Header
        resizePercentage={resizePercentage}
        setResizePercentage={setResizePercentage}
      />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Body resizePercentage={resizePercentage} />
        {/* <DevConsole /> */}
      </div>
    </section>
  );
}

export default Home;
