import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Guest = ({ children }) => {
  const token = Cookies.get("token");
  return !token ? children : <Navigate to="/" />;
};

export default Guest;
