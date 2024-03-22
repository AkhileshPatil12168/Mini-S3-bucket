import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";

const Admin = () => {
  return (
    <>
      <Link to="/" href="#" className=" hover:underline">
        Home
      </Link>
      <Link to="/admin/storages" href="#" className="px-4 hover:underline">
        Storages
      </Link>
      <Link to="/admin/users" className="hover:underline">
        Users
      </Link>
      <Link to="/admin/analysis" className="px-4 hover:underline">
        Analysis
      </Link>
      <Link to="/admin/profile" className=" hover:underline">
        Account
      </Link>
    </>
  );
};
const User = () => {
  return (
    <>
      <Link to="/" href="#" className=" hover:underline">
        Home
      </Link>
      <Link to="/storage" href="#" className="px-4 hover:underline">
        My Storage
      </Link>
      <Link to="/buckets" className=" hover:underline">
        Buckets
      </Link>
      <Link to="/pricing" className="px-4 hover:underline">
        Pricing
      </Link>
      <Link to="/account" className=" hover:underline">
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
      {isLogedIn && whoLogedIn?.type == "User" ? (
        <User />
      ) : isLogedIn && whoLogedIn?.type == "Admin" ? (
        <Admin />
      ) : (
        <>
          <Link to="/" href="#" className="px-4 hover:underline">
            Home
          </Link>
          <Link to="/login" href="#" className="px-4 hover:underline">
            My_Storage
          </Link>
          <Link to="/pricing" className="px-4 hover:underline">
            Pricing
          </Link>
        </>
      )}
      <Link to="/contactus" className="px-4 hover:underline ">
        Contact_Us
      </Link>
      {isLogedIn ? (
        <button onClick={() => logOut()}>logout</button>
      ) : (
        <Link to="/login" className=" hover:underline px-4">
          login
        </Link>
      )}
     
    </div>
  );
};

export default Header;
