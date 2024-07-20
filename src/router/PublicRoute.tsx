import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const user: any = useAuth();
  if (user.isLoggedIn) return <Navigate to="/employees" />;
  return <Outlet />;};

export default PublicRoute;