import React, { useState } from "react";
import DatePicker from "react-datepicker";

const AdminAccountPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  const handleUpdate = () => {
    // Handle update logic here
    console.log("Update button clicked!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 ">
      <div className="container mx-auto py-8 flex-grow md:px-[30%] ">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
     
          <div className="mb-4 ">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold">
              User Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              value={userName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-lg font-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-lg font-semibold">
              Date of Birth
            </label>
            <DatePicker
              className="px-[44%] md:px-[78%] rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
            />
          </div> */}
      
        <div className="flex justify-center mt-8">
          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountPage;
