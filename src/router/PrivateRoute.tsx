import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const user: any = useAuth();
  if (!user.isLoggedIn) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;