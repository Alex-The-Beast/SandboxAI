// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; 
  {console.log(user)}// wait until we check cookie
  if (!user) return <Navigate to="/"  />; // redirect to home/login

  return children;
};

export default PrivateRoute;
