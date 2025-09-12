import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // No token? redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists → render the child route (protected page)
  return <Outlet />;
};

export default AuthRoute;


