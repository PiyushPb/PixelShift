import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider as PixelShiftTheme } from "./context/ThemeContext"; // Your custom theme provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PixelShiftTheme>
      <App />
    </PixelShiftTheme>
  </StrictMode>
);
