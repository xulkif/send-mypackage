import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const CheckOut = ({ user, children }) => {
  const location = useLocation();

  const userRole = user.role;
  
  // Only redirect admin users if they're NOT already on admin routes
  if (
    userRole === "admin" &&
    user.isAuthenticated &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Only redirect regular users if they're on root path
  if (userRole === "user" && location.pathname === "/") {
    return <Navigate to="/user/Home" replace />;
  }

  return children;
};

export default CheckOut;
