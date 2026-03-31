import { useContext } from "react";
import { roleContext } from "../constext/userRole.context";
import { Navigate } from "react-router-dom";



export const ProtectedRoute = ({ children, allowedRole }) => {
  const {role} = useContext(roleContext)

  if (!role) return <Navigate to="/" />;
  if (role !== allowedRole) return <Navigate to="/" />;

  return children;
};