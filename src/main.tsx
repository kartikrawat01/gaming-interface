import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";
 
const router = getRouter();
 
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  // ✅ StrictMode hataya — double useEffect calls band
  // (Socket double connect + wallet loop fix)
  <RouterProvider router={router} />
);
