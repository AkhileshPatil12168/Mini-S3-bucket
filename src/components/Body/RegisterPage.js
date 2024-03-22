import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
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
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
            />
          </div>
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
          <div className="flex justify-center ">
            <DatePicker
              className="py-2 w- rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Date of Birth"
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
