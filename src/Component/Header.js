import React,{useState} from "react";
import "../Styles/Header.css";
import logo from '../Image/pay2view.png'



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // mock user

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => setUserLoggedIn(false);

  function addsString(string){
    let result = 0
    let Fr;
    

 let arrayToString = string.split("")
 for (const num of arrayToString){
  let changeToNumber = parseInt(num)
  result +=changeToNumber
 
   Fr = result.toString().split("")

   if(Fr.length > 1){
    for(const f of Fr){
      let ftn = parseInt(f)
let frr =0
      frr +=ftn
       result = frr
    }
    
   }
  
 }
console.log(result)
  }
addsString('55555')

  return (
    <header className="header">
      <a href="/home">
        <div className="logo">
          <img src={logo} alt="Pay2View Logo" />
        </div>
      </a>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {!userLoggedIn ? (
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
            <img
              src="https://images.unsplash.com/photo-1756669086471-58531cdeb0c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              className="profile-pic-nav"
            />
            <span className="username">JohnDoe</span>
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

