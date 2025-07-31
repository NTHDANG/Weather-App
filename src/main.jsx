import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Weather from "./Weather.jsx";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WeatherProvider } from "./contexts/WeatherContext";

// KHỞI TẠO ỨNG DỤNG REACT
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
    </ThemeProvider>
  </StrictMode>
);
