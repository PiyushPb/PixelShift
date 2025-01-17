import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import { deviceInfo } from "./constants/app";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
      <h1 className="fixed bottom-5 right-5 text-sm text-gray-600 z-[9999] select-none">
        {deviceInfo.appName}-{deviceInfo.appVersion}
      </h1>
    </>
  );
}

export default App;
