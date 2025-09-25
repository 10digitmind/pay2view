// AutoLogoutHandler.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";


function AutoLogoutHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && expiresAt) {
      const timeLeft = Number(expiresAt) - Date.now();

      if (timeLeft <= 0) {

        dispatch(logout());
        navigate("/login");
        localStorage.clear()
      } else {
        const timer = setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    }
  }, [dispatch, navigate]);

  return null; // nothing visible
}

export default AutoLogoutHandler;
