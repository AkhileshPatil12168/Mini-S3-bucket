import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import dotenv from "dotenv";
require("dotenv").config();

import Header from "./components/Header/Header";

import HomePage from "./components/Body/HomePage";

import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Body/LoginPage";
import PricingPage from "./components/Body/PricingPage";
import RegisterPage from "./components/Body/RegisterPage";
import { LoginState } from "./Context/loginContext";
import UserStoragePage from "./components/Body/User/UserStoragePage";
import UserBucketPage from "./components/Body/User/UserBucketPage";
import UserAccountPage from "./components/Body/User/UserProfilePage";
import ContactPage from "./components/Body/ContactUsPage";
import CreateNewAdminPage from "./components/Body/Admin/CreateNewAdminPage";
import AdminAccountPage from "./components/Body/Admin/AdminProfilePage";
import UserBucketsPage from "./components/Body/User/UserAllBucketsPage";
import AdminStoragePage from "./components/Body/Admin/AdminStoragePage";
import AllStoragePage from "./components/Body/Admin/AdminAllStorages";
import AdminUsersPage from "./components/Body/Admin/AdminAllUsersPage";
import AdminUserPage from "./components/Body/Admin/AdminUserPage";
import AdminBucketPage from "./components/Body/Admin/AdminBucketPage";

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
      { path: "/login", element: <LoginPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/register", element: <RegisterPage /> },

      { path: "/admin/create/admin", element: <CreateNewAdminPage /> },
      { path: "/admin/profile", element: <AdminAccountPage /> },
      { path: "/admin/storages", element: <AllStoragePage /> },
      { path: "/admin/storage/:id", element: <AdminStoragePage /> },
      { path: "/admin/users", element: <AdminUsersPage /> },
      { path: "/admin/user/:id", element: <AdminUserPage /> },
      { path: "/admin/bucket/:id", element: <AdminBucketPage /> },


      { path: "/storage", element: <UserStoragePage /> },
      { path: "/buckets", element: <UserBucketsPage /> },
      { path: "/bucket/:id", element: <UserBucketPage /> },
      { path: "/account", element: <UserAccountPage /> },

      { path: "/contactus", element: <ContactPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
