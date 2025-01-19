import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider as PixelShiftTheme } from "./context/ThemeContext"; // Your custom theme provider
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <PixelShiftTheme>
        <ToastContainer />
        <App />
      </PixelShiftTheme>
    </ThemeProvider>
  </StrictMode>
);
