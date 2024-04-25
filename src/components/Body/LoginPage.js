import React, { useState, useContext } from "react";
import { Link, useNavigate, redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../Context/loginContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let stateData = location?.state;
  const { setIsLogedIn, setWhoLogedIn, setToken } = useContext(LoginContext);
  const [data, setData] = useState({ email: stateData?.email || "", password: "" });
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      let response = await axios.post(process.env.BACKENDAPI + "/login", formData, {
        withCredentials: true,
      });
      setResponseData(response.data.data);
      setIsLogedIn(true);
      setWhoLogedIn({ type: response?.data?.data?.userType, id: response?.data?.data?.userId });
      setToken(response?.data?.data?.token);
      if (response.status == 200) navigate("/");

      console.log(response.data.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen px-2">
      <div className="container mx-auto py-8 flex-grow flex justify-center items-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full sm:max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Login</h2>
          <form className="space-y-4" method="POST">
            <div>
              <label htmlFor="email" className="block text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleSubmit}
                className="text-black w-full px-4 py-2 rounded-md border mb-2 border-gray-300 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleSubmit}
                className="text-black w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <p className="text-red-500 text-center">{error}</p>
            </div>
            <div>
              <button
                type="submit"
                name="login"
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                onClick={login}
              >
                login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-500">Don't have an account?</span>{" "}
            <Link to="/register">
              <button className="text-yellow-500 hover:underline">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
