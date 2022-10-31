import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckAuth = ({ children }) => {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" />;
};

export default CheckAuth;
