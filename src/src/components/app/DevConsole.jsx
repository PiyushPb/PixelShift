import React from "react";
import SiteInfo from "../devConsole/SiteInfo";

function DevConsole() {
  return (
    <div className="w-[600px] bg-background dark:bg-background h-full p-5 overflow-y-scroll">
      <SiteInfo />
    </div>
  );
}

export default DevConsole;
