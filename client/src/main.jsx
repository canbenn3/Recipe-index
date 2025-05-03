import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "vite/modulepreload-polyfill";
import { createHashRouter, RouterProvider } from "react-router";
import { Home } from "./Components/HomePage/Home.tsx";
import { UploadForm } from "./Components/UploadPage/UploadForm.tsx";
import { RecipePage } from "./Components/RecipePage/RecipePage.tsx";
import { Profile } from "./Components/ProfilePage/Profile.tsx";
import { ScreenSizeProvider } from "./Context/ScreenSizeContext.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "upload", element: <UploadForm /> },
      { path: "recipe/:id", element: <RecipePage /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenSizeProvider>
    <RouterProvider router={router} />
  </ScreenSizeProvider>
);
