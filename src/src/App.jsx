import React from "react";
import { useTheme } from "./context/ThemeContext"; // Import from your custom context

function App() {
  const { theme, toggleTheme } = useTheme(); // Use your custom theme hook

  return (
    <div className={`min-h-screen bg-red-200 dark:bg-black transition-all`}>
      <div className="flex justify-center items-center min-h-screen">
        <button
          onClick={toggleTheme}
          className="px-6 py-2 text-white bg-blue-500 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default App;
