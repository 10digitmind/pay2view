import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../Styles/Login.css";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../Redux/Asyncthunk";
import { useNavigate } from "react-router-dom";
import TelegramBotAd from "./TelegramBotAd";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading]= useState(false)
  const [error, setError] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);



  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {

  if (!navigator.onLine) {
  toast.error("No internet connection. Please check your network.");
  return;
}
  if (!email || !password) {
    return toast.error("Please input your email and password");
  }

  setLoading(true);
  setError(null);




  try {
    // Optional: set a timeout for slow networks
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000); // 10 seconds timeout

    const result = await dispatch(
      loginUser({ email, password, signal: controller.signal })
    ).unwrap();

    clearTimeout(timeout);

    if (result?.token) {
      localStorage.setItem("authToken", result.token);
        const now = Date.now();
      const expiresAt = now + 24 * 60 *60 * 1000; 
        localStorage.setItem("expiresAt", expiresAt);
      toast.success("Login successful!");
      navigate("/dashboard");
    }
} catch (error) {
  if (error?.name === "AbortError") {
    toast.error("Network is slow. Please try again.");
  } else if (error === "Email not verified" || error?.message === "Email not verified") {
    toast.error("Please verify your email before logging in.");
    navigate(`/email-verification-sent/${email}`);
  } else {
    toast.error(
      typeof error === "string" ? error : error?.message || "Login failed. Please try again."
    );
  }
  setError(error);
} finally {
    setLoading(false);
  }
};


  return (
    <>
    
    <TelegramBotAd/>
    <div className="login-page">
      <h2 className="login-title">Sign in to your Pay2View account</h2>
      <p className="login-subtitle">
        Access your account and continue your journey
      </p>

      <div className="login-container">
        {/* Email Input */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
    value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your@email.com"
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
       
          />
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="extra-options">
          <a href="/forgot-password">Forgot Password?</a>
          <p>
            Don’t have an account? <a href="/getstarted">Sign Up</a>
          </p>
        </div>

 <button onClick={handleLogin} className="login-btn" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>
      </div>

      {/* Security Badges */}
      <div className="security-section">
        <div className="security-item">
          <span className="circle"></span>
          Secure Login
        </div>
        <div className="security-item">
          <span className="circle"></span>
          Encrypted
        </div>
        <div className="security-item">
          <span className="circle"></span>
          Privacy Protected
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
