
import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import Homepage from './Component/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import SignUp from './Component/Signup';
import ForgotPassword from './Component/Forgotpassword';
import { useState,useEffect} from 'react';
import SplashScreen from './Component/SplashScreen';
import logo from '../src/Image/pay2view.png'
import Dashboard from './Component/Dashboard';


function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      // Show splash only on the very first visit
      setShowSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true"); // Mark splash as seen
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return (
      <SplashScreen
        logoSrc={logo}
        tagline="Turn your content into cash"
      />
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

