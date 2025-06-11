// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState(''); // Used for the new password during reset
//   const [error, setError] = useState("");
//   const [showResetPassword, setShowResetPassword] = useState(false); // Track if reset password form is shown
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/login', { email, password }, { withCredentials: true });

//       if (response.data.success) {
//         console.log('Login successful:', response.data);
//         // Store the token and user data in local storage or context
//         localStorage.setItem('token', response.data.token);
//         // Redirect to dashboard or another page
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       setError('Invalid Credentials or something went wrong');
//       console.error(error);
//     }
//   };

//   const handleSignUpRedirect = () => {
//     navigate("/form"); // Redirect to sign-up page
//   };

//   // Handle showing the password reset form
//   const handleForgetPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:4000/forget-password', { email, newPassword });

//       if (response.status === 200) {
//         alert('Password updated successfully');
//         setShowResetPassword(false); // Close the reset form
//       }
//     } catch (error) {
//       setError('Something went wrong or invalid email');
//       console.error(error);
//     }
//   };

//   const handleResetPasswordClick = () => {
//     setShowResetPassword(true);
//   };

//   return (
//     <div id="login-screen" className="hidden" role="form">
//       <div className="login-logo">ServerEye</div>
//       <div className="login-container">
//         {!showResetPassword ? (
//           <>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin} noValidate>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="text"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Email"
//                   aria-label="Email"
//                   aria-describedby="error-message"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter password"
//                   aria-label="Password"
//                   aria-describedby="error-message"
//                 />
//               </div>
//               <div className="form-footer">
//                 <label>
//                   <input type="checkbox" id="remember-me" /> Remember Me
//                 </label>
//                 <a href="#" onClick={handleResetPasswordClick}>Forgot Password?</a>
//               </div>
//               <button
//                 id="login-button"
//                 className="save-button"
//                 aria-label="Login"
//                 type="submit"
//               >
//                 Login
//               </button>
//             </form>
//           </>
//         ) : (
//           // Forget Password Form
//           <>
//             <h1>Reset Password</h1>
//             <form onSubmit={handleForgetPassword} noValidate>
//               <div className="forget-password-group">
//                 <label htmlFor="email">Enter your email to reset password</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Email"
//                   aria-label="Email"
//                   aria-describedby="error-message"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="newPassword">New Password</label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter New Password"
//                   aria-label="New Password"
//                   aria-describedby="error-message"
//                 />
//               </div>
//               <div className="button-container">
//                 <button
//                   id="reset-password-button"
//                   className="reset-button"
//                   aria-label="Reset Password"
//                   type="submit"
//                 >
                  
//                   Reset Password
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowResetPassword(false)} 
//                   className="cancel-button"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </>
//         )}

//         {!showResetPassword && (
//           <div className="signup-redirect">
//             <p>
//               Don’t have an account?{" "}
//               <span
//                 onClick={handleSignUpRedirect}
//                 className="signup-link"
//                 role="button"
//                 tabIndex="0"
//               >
//                 Sign Up
//               </span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ Import useAuth

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth(); // ✅ use login from AuthContext

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         console.log("Login successful:", response.data);

//         // ✅ Save user and token
//         login(response.data.user); // Stores user (with role) in context
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem('role', response.data.user.role);

//         navigate("/dashboard");
//       }
//     } catch (error) {
//       setError("Invalid Credentials or something went wrong");
//       console.error(error);
//     }
//   };

//   const handleSignUpRedirect = () => {
//     navigate("/form");
//   };

//   const handleForgetPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/forget-password",
//         { email, newPassword }
//       );

//       if (response.status === 200) {
//         alert("Password updated successfully");
//         setShowResetPassword(false);
//       }
//     } catch (error) {
//       setError("Something went wrong or invalid email");
//       console.error(error);
//     }
//   };

//   const handleResetPasswordClick = () => {
//     setShowResetPassword(true);
//   };

//   return (
//     <div id="login-screen" className="hidden" role="form">
//       <div className="login-logo">ServerEye</div>
//       <div className="login-container">
//         {!showResetPassword ? (
//           <>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin} noValidate>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="text"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Email"
//                   aria-label="Email"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter password"
//                   aria-label="Password"
//                 />
//               </div>
//               <div className="form-footer">
//                 <label>
//                   <input type="checkbox" id="remember-me" /> Remember Me
//                 </label>
//                 <a href="#" onClick={handleResetPasswordClick}>
//                   Forgot Password?
//                 </a>
//               </div>
//               <button className="save-button" type="submit">
//                 Login
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1>Reset Password</h1>
//             <form onSubmit={handleForgetPassword} noValidate>
//               <div className="forget-password-group">
//                 <label htmlFor="email">Enter your email to reset password</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Email"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="newPassword">New Password</label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter New Password"
//                 />
//               </div>
//               <div className="button-container">
//                 <button className="reset-button" type="submit">
//                   Reset Password
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowResetPassword(false)}
//                   className="cancel-button"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </>
//         )}

//         {!showResetPassword && (
//           <div className="signup-redirect">
//             <p>
//               Don’t have an account?{" "}
//               <span onClick={handleSignUpRedirect} className="signup-link">
//                 Sign Up
//               </span>
//             </p>
//           </div>
//         )}
//         {error && <div className="error-message">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to backend
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: true,
        }
      );

      const { user, success, token } = response.data;

     if (success) {
      login(user);
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("permissions", JSON.stringify(user.permissions || []));
      navigate("/dashboard");
    } else {
      setError("Login failed: backend rejected the credentials.");
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    setError("Invalid credentials or server error.");
  } finally {
    setLoading(false);
  }
};
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      setShowResetPassword(false);
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Failed to send reset email.");
    }
  };

  return (
    <div id="login-screen" className="login-wrapper" role="form">
      <div className="login-logo">ServerEye</div>
      <div className="login-container">
        {!showResetPassword ? (
          <>
            <h1>Login</h1>
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  aria-label="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  aria-label="Password"
                />
              </div>
              <div className="form-footer">
                <label>
                  <input type="checkbox" id="remember-me" /> Remember Me
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResetPassword(true);
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <button className="save-button" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Reset Password</h1>
            <form onSubmit={handleForgetPassword} noValidate>
              <div className="forget-password-group">
                <label htmlFor="email">Enter your email to reset password</label>
                <input
                  type="email"
                  id="reset-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div className="button-container">
                <button className="reset-button" type="submit">
                  Send Reset Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {!showResetPassword && (
          <div className="signup-redirect">
            <p>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/form")} className="signup-link">
                Sign Up
              </span>
            </p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
