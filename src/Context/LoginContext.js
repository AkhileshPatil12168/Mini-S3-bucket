import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginContext = createContext();

const LoginState = (props) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const cToken = cookies.get("token");
  const cUserId = cookies.get("User");
  const cAdminId = cookies.get("Admin");

  const [isLogedIn, setIsLogedIn] = useState(false);
  const [whoLogedIn, setWhoLogedIn] = useState(null);
  const [token, setToken] = useState(null);

  const logOut = () => {
    setIsLogedIn(false);
    setWhoLogedIn(null);
    cookies.remove("token", { path: "/", domain: process.env.DOMAIN });
    cookies.remove("User", { path: "/", domain: process.env.DOMAIN });
    cookies.remove("Admin", { path: "/", domain: process.env.DOMAIN });
    navigate("/");
  };

  useEffect(() => {
    if (cUserId && cToken) {
      setWhoLogedIn({type:"User",id:cUserId});
      setIsLogedIn(true), setToken(cToken);
    }
    if (cAdminId && cToken) {
      setWhoLogedIn({type:"Admin",id:cAdminId});
      setIsLogedIn(true), setToken(cToken);
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLogedIn,
        whoLogedIn,
        setIsLogedIn,
        whoLogedIn,
        setWhoLogedIn,
        token,
        setToken,
        logOut,
        cUserId
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginState };
