import React, { useState } from "react";

function Test() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="text-center p-4">Test Page for Contrast Extension</h1>

      <div className="w-full h-[50vh] bg-red-200 flex justify-center items-center">
        <p className="text-xl">Red Section - Count: {count}</p>
        <button className="ml-4 p-2 bg-gray-300" onClick={handleClick}>
          Add 1
        </button>
      </div>

      <div className="w-full h-[50vh] bg-blue-200 flex justify-center items-center">
        <p className="text-xl">Blue Section</p>
      </div>

      <div className="w-full h-[50vh] bg-orange-200 flex justify-center items-center">
        <p className="text-xl">Orange Section</p>
      </div>

      <div className="w-full h-[50vh] bg-green-200 flex justify-center items-center">
        <p className="text-xl">Green Section</p>
      </div>
    </div>
  );
}

export default Test;
