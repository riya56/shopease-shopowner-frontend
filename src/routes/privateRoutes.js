import React from "react";
import { Redirect } from "react-router-dom";


const PrivateRoute = ({ component }) => {
  const Component = component;
  const isAuthenticated = JSON.parse(localStorage.getItem("userInfo")) != undefined ? JSON.parse(localStorage.getItem("userInfo")).token === '' ? false : true : false;//auth.isLoggedIn;
  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
  // const isAuthenticated = true;
  // return isAuthenticated ? (
  //   <Component />
  // ) : (
  //   <Redirect to={{ pathname: "/login" }} />
  // );
};

export default PrivateRoute;
