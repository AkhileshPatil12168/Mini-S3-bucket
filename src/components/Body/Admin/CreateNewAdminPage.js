import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNewAdminPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    secretKey: "",
  });
  const [fromDate, setFromDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center md:px-[20%] lg:px-[25%] xl:px-[30%] px-4">
      <div className="bg-gray-600 p-8 rounded-lg shadow-md ">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Create New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="User Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
          />
          <input
            type="password"
            name="secretKey"
            value={formData.secretKey}
            onChange={handleChange}
            placeholder="Secret Key"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
          />

        </form>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 mt-12  rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            Create
          </button>
      </div>
    </div>
  );
};

export default CreateNewAdminPage;
