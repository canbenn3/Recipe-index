import React, { useState } from "react";
import { Header } from "./Components/Header";
import { UploadForm } from "./UploadPage/UploadForm";
import { Home } from "./HomePage/Home";
import { createHashRouter, Outlet, RouterProvider } from "react-router";


function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
