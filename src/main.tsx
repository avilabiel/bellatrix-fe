import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Map from "./pages/Map";

const rootElement = document.querySelector('[data-js="root"]');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/map",
    element: <Map />,
  },
]);

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
