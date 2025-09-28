
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
import { ToastContainer } from 'react-toastify';
import VerifyEmailPage from './Component/VerifyEmailPage';
import EmailVerificationLanding from './Component/EmailVerificationLanding';
import AuthRoute from './Component/AuthRoute';
import UploadContent from './Component/UploadContent';
import ViewContent from './Component/ViewContent';
import PaymentVerification from './Component/PaymentVerification';
import ResetPassword from './Component/ResetPassword';

import AutoLogoutHandler from './utils/AutoLogOutHandler';
import GuestRoute from './Component/GuestRoute';
import AboutPage from './Component/AboutPage';
import ContactPage from './Component/ContactPage';
import FaqPage from './Component/FaqPage';
import TermsPage from './Component/TermsPage';
import PrivacyPolicyPage from './Component/PrivacyPolicyPage';



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
         <ToastContainer position="top-right" autoClose={3000} />
      <Header />
        <AutoLogoutHandler/>
      <Routes>
    
    <Route element={<GuestRoute/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route path="/email-verification-sent/:email" element={<VerifyEmailPage />} />
     <Route path="/verify-email" element={<EmailVerificationLanding />} />
   
        <Route path="/reset-password/:token" element={<ResetPassword />} />
         </Route>
  
 <Route path="/view-content/:title/:id" element={<ViewContent />} />
     <Route path="/payment-verification" element={<PaymentVerification />} />
          <Route path="/about-us" element={<AboutPage />} />
                 <Route path="/contact" element={<ContactPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                         <Route path="/Terms-Condition" element={<TermsPage />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

    <Route path="/" element={<Homepage />} />
               <Route element={<AuthRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/uplaod-content" element={<UploadContent />} />

    </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

