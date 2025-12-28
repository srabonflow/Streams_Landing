import React from "react";
import { useAuth } from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
