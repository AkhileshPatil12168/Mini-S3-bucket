import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";

const Admin = () => {
  return (
    <>
     <Link to="/admin/server" href="#" className="px-2 hover:underline">
        Server
      </Link>
      <Link to="/admin/storages" href="#" className="px-2 hover:underline">
        Storages
      </Link>
      <Link to="/admin/users" className="px-2 hover:underline">
        Users
      </Link>
      <Link to="/admin/analysis" className="px-2 hover:underline">
        Analysis
      </Link>
      <Link to="/admin/profile" className="px-2 hover:underline">
        Account
      </Link>
    </>
  );
};
const User = () => {
  return (
    <>
      <Link to="/storage" href="#" className="px-2 hover:underline">
        My Storage
      </Link>
      <Link to="/buckets" className="px-2 hover:underline">
        Buckets
      </Link>
      <Link to="/objects" className="px-2 hover:underline">
        Objects
      </Link>
      <Link to="/pricing" className="px-2 hover:underline">
        Pricing
      </Link>
      <Link to="/account" className="px-2 hover:underline">
        Account
      </Link>
    </>
  );
};

const Header = () => {
  const { isLogedIn, whoLogedIn, logOut } = useContext(LoginContext);
  console.log(isLogedIn, whoLogedIn);

  useEffect(() => {}, [isLogedIn]);

  return (
    <div className="bg-gray-800 text-white text-center py-4">
      <div className="flex flex-wrap justify-center">
        <Link to="/" href="#" className="px-2  hover:underline">
          Home
        </Link>
        {isLogedIn && whoLogedIn?.type == "User" ? (
          <User />
        ) : isLogedIn && whoLogedIn?.type == "Admin" ? (
          <Admin />
        ) : (
          <>
            <Link to="/login" href="#" className="px-2 hover:underline">
              My_Storage
            </Link>
            <Link to="/pricing" className="px-2 hover:underline">
              Pricing
            </Link>
          </>
        )}
        <Link to="/contactus" className="px-2 hover:underline ">
          Contact_Us
        </Link>
        {isLogedIn ? (
          <button className="px-2 hover:underline" onClick={() => logOut()}>logout</button>
        ) : (
          <Link to="/login" className="px-2 hover:underline ">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
