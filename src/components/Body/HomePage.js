import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";
import UserHomePage from "./User/UserHomePage";
import AdminHomePage from "./Admin/AdminHomePage";
const Feature = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:bg-gray-100 mx-4 md:mx-0 md:px-4 mb-6 md:mb-0">
      <h2 className="text-xl font-semibold mb-4 text-yellow-500">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};
const HomePage = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);
  console.log(whoLogedIn);
  useEffect(()=>{},[isLogedIn,whoLogedIn]) 
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container px-4 py-8 flex-grow md:px-[20%]">
      {isLogedIn && whoLogedIn?.type == "User" ? (
        <UserHomePage/>
      ) : isLogedIn && whoLogedIn?.type == "Admin" ? (
       <AdminHomePage/>
      ) : (
        <>
           <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Mini S3 Bucket</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          <Feature
            title="500 MB Free Storage"
            description="Get started with 500 MB of complimentary storage space to securely store and access your files. Enjoy the convenience of anytime, anywhere access without any cost."
          />
          <Feature
            title="Use Anywhere"
            description="Get shareable links for your uploaded files. Embed them in websites, emails, or share them directly."
          />
          <Feature
            title="Fast & Reliable"
            description="Experience lightning-fast response times with our robust, Redis-powered infrastructure."
          />
          <Feature
            title="Create Multiple Buckets"
            description="Create and manage multiple buckets with distinct settings and permissions, tailored to your specific needs for organized storage and streamlined workflow."
          />
        </div>
        <Link to="/register">
          <div className="flex justify-center mt-8">
            <button className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
              Register Now
            </button>
          </div>
        </Link>
        </>
      )}
      
       
      </div>
    </div>
  );
};

export default HomePage;
