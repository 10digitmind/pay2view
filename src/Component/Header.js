import React,{useState} from "react";
import "../Styles/Header.css";
import logo from '../Image/pay2view.png'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user} = useSelector((state) => state.auth)

  const token = localStorage.getItem('authToken')

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate =useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    localStorage.clear()
   await dispatch(logout())
    navigate('login')


  }

  return (
    <header className="header">
      <a href={token?'/dashboard':'/home'}>
        <div className="logo">
          <img src={logo} alt="Pay2View Logo" />
        </div>
      </a>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {!token ? (
          <>
            <a href="/login">
              <button className="header-login-btn">Log In</button>
            </a>
            <a href="/getstarted">
              <button className="header-signup-btn">Get Started</button>
            </a>
          </>
        ) : (
          <div className="user-menu">
         {user?.profilePhoto ? (
  <img
    src={user.profilePhoto}
    alt="Profile"
    className="profile-pic-nav"
  />
) : (
  <div className="avatar-fallback">
    {user?.username?.slice(0, 2).toUpperCase()}
  </div>
)}

         
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Hamburger / Close */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

