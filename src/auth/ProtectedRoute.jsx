import React from "react";
import { Navigate, Outlet } from "react-router-dom";
 
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
 
  if (!token) {
    
    return <Navigate to="/" replace/>;
  }
 
  return <Outlet/>;
};
 
export default ProtectedRoute;