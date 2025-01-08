import React from "react";
import { GoArrowLeft, GoArrowRight, GoHome } from "react-icons/go";
import { MdOutlineRefresh } from "react-icons/md";
import HeaderTools from "./HeaderTools";

function Header({ resizePercentage, setResizePercentage }) {
  return (
    <div className="w-full flex justify-normal items-center p-3 bg-secondary-background">
      <div className="flex justify-start items-center gap-2">
        <div>
          <GoArrowLeft size={20} className="text-gray-400" />
        </div>
        <div>
          <GoArrowRight size={20} className="text-gray-400" />
        </div>
        <div className="">
          <MdOutlineRefresh size={20} className="text-gray-400" />
        </div>
      </div>
      <div
        className={`w-full ml-3 px-4 py-2 text-[14px] border-[1px] border-solid border-[#E5E7EB] rounded-full`}
      >
        <input
          type="text"
          placeholder="Enter the URL"
          className={`w-full border-none outline-none bg-transparent`}
          //   onChange={(e) => setUrl(e.target.value)}
          //   value={url}
        />
      </div>
      <HeaderTools resizePercentage={resizePercentage} setResizePercentage={setResizePercentage}/>
    </div>
  );
}

export default Header;
