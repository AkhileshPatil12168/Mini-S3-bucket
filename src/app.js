import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import dotenv from "dotenv";
require("dotenv").config();

import Header from "./components/Header/Header";

import HomePage from "./components/Body/HomePage";

import Footer from "./components/Footer/Footer";
const AppLayout = () => {
  return (
    <LoginState>
      <Header />
      <Outlet />
      <Footer />
    </LoginState>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
