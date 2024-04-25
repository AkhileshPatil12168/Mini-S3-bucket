import React, { useState } from "react";
import DatePicker from "react-datepicker";

const UserAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [fromDate, setFromDate] = useState(null);

  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
  });

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Update button clicked!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4">
      <div className="container mx-auto py-8 flex-grow  md:px-[25%] lg:[30%] xl:px-[35%] ">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>

        <div className="mb-4 ">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              First Name
            </label>
            <label className="text-red-500">{error?.fname}</label>
          </div>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              Last Name
            </label>
            <label className="text-red-500">{error?.lname}</label>
          </div>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              Email
            </label>
            <label className="text-red-500">{error?.email}</label>
          </div>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              Phone
            </label>
            <label className="text-red-500">{error?.phone}</label>
          </div>
          <input
            type="text"
            id="phone"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              Password
            </label>
            <label className="text-red-500">{error?.password}</label>
          </div>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4  ">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="block mb-2 text-lg font-semibold ">
              Date Of Birth
            </label>
            <label className="text-red-500">{error?.dateOfBirth}</label>
          </div>
          <div className="flex justify-left w-fit">
            <DatePicker
              className=" rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
            />
          </div>
        </div>

        <div className="text-center text-red-500">Error Response</div>
        <div className="flex justify-center mt-4">
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

export default UserAccountPage;
