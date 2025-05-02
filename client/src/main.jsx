import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router'
import { Home } from './HomePage/Home.tsx'
import { UploadForm } from './UploadPage/UploadForm.tsx'
import { RecipePage } from './RecipePage/RecipePage.tsx'
import {Profile} from './ProfilePage/Profile.tsx'

const router = createHashRouter([
    { path: "/",
    element: <App />,
     children: [
        {path: "", element: <Home />},
        {path: "upload", element: <UploadForm /> },
        {path: "recipe/:id", element: <RecipePage />},
        {path: "profile", element: <Profile />}
    ]},
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
