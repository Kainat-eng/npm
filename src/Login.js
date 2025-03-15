// // Login.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Placeholder for authentication logic
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (email && password) {
//       // Simulate successful login
//       console.log("Login successful");
//       navigate("/dashboard"); // Redirect to the dashboard
//     } else {
//       alert("Please enter your email and password.");
//     }
//   };

//   const handleSignUpRedirect = () => {
//     navigate("/signup"); // Redirect to the signup page
//   };

//   return (
//     <div id="login-screen" className="hidden" role="form">
//       <div className="login-logo">ServerEye</div>
//       <div className="login-container">
//         <h1>Login</h1>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="Email"
//             placeholder="Enter Email"
//             aria-label="Email"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="enter_password"
//             placeholder="Enter password"
//             aria-label="Password"
//           />
//         </div>
//         <div className="form-footer">
//           <label>
//             <input type="checkbox" id="remember-me" /> Remember Me
//           </label>
//           <a href="#">Forgot Password?</a>
//         </div>
//         <button
//           id="login-button"
//           className="save-button"
//           aria-label="Login"
//           onClick={handleLogin}
//         >
//           Login
//         </button>
//         <div className="signup-redirect">
//           <p>
//             Don’t have an account? <span onClick={handleSignUpRedirect} className="signup-link">Sign Up</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
