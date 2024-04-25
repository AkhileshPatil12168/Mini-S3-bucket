import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import showPass from "../../icons/show eye-12108.svg";
import hidePass from "../../icons/hidden-eye-outline-12113.svg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [fromDate, setFromDate] = useState(null);
  const [passwordState, setPasswordState] = useState("password");
  const [passSvg, setPassSvg] = useState(showPass);

  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
  });

  const [serverResponse, setServerResponse] = useState("");
  const [resColor, setResColor] = useState("text-red-500");

  const handlePassVisiblity = () => {
    if (passwordState == "password") {
      setPassSvg(hidePass);
      setPasswordState("text");
    } else {
      setPassSvg(showPass);
      setPasswordState("password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(fromDate);
    setServerResponse("");
  };

  const moveToLogInPage = (email) => {
    console.log(email);
    setResColor("text-green-500");
    setServerResponse("Registered Successfully");
    (() =>
      setTimeout(() => {
        navigate("/login", { state: { email } });
      }, 1000))();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append("dateOfBirth", fromDate);
      const response = await axios.post(process.env.BACKENDAPI + "/register/user", formData, {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      if (response.status == 201) moveToLogInPage(response?.data?.data?.email);
    } catch (error) {
      console.log(error?.response.status);
      setServerResponse(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Register</h2>
        <form className="space-y-4" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="">
              <input
                type="text"
                name="fname"
                value={data.fname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
              />

              <p className="text-red-500 text-end h-4">{error?.fname}</p>
            </div>
            <div className="">
              <input
                type="text"
                name="lname"
                value={data.lname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2  rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
              />
              <p className="text-red-500 text-end h-4">{error?.lname}</p>
            </div>
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
            />
            <p className="text-red-500 text-end h-4">{error?.email}</p>
          </div>
          <div className="">
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
            />
            <p className="text-red-500 text-end h-4">{error?.phone}</p>
          </div>
          <div className="">
            <div className="flex ">
              <input
                type={passwordState}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2  border rounded-l-md border-gray-300 focus:outline-none border-r-0 rounded-r-0 focus:border-yellow-500 text-black"
              />
              <div onClick={handlePassVisiblity} className="">
                <img
                  src={passSvg}
                  className="h-11 p-2 border border-gray-300   bg-gray-300 border-l-0 rounded-r-md"
                ></img>
              </div>
            </div>
            <p className="text-red-500 text-end h-4">{error?.password}</p>
          </div>

          <div className="">
            <DatePicker
              className="py-2  rounded-md  border border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
              selected={fromDate}
              onChange={(date) => setFromDate(new Date(date).getTime())}
              dateFormat="yyyy-MM-dd"
              placeholderText="Date of Birth"
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
            />
            <p className="text-red-500 h-0 text-end">{error?.dateOfBirth}</p>
          </div>
          <p className={`${resColor} h-4 text-center text-xl `}>{serverResponse}</p>

          <button
            type="submit"
            onClick={handleSubmit}
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
