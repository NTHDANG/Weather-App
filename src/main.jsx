import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Weather from "./Weather.jsx";

// KHỞI TẠO ỨNG DỤNG REACT
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
