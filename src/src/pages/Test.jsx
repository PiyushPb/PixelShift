import React, { useState } from "react";

function Test() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div className="w-full h-[50vh] bg-red-200 flex justify-center items-center">
        {count}
        <button onClick={handleClick}>Add 1</button>
      </div>
      <div className="w-full h-[50vh] bg-blue-200"></div>
      <div className="w-full h-[50vh] bg-orange-200"></div>
      <div className="w-full h-[50vh] bg-green-200"></div>
    </div>
  );
}

export default Test;
