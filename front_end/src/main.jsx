import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { LoginPage } from './routes/LoginPage';
import { ToastContainer } from "react-toastify";
import { VideoLiveFeed } from './videofeed/VideoFeed';

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <LoginPage />
  },
  {
    path: "/VideoLiveFeed",
    element: <VideoLiveFeed />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
