import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Map from "./Map";
import { TripProvider } from "./context/TripContext";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <TripProvider>
    <RouterProvider router={router} />
  </TripProvider>
);
