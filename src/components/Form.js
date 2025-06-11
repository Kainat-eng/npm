import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Form() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Create Firebase user (email + password)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Send user info + token to backend (no password here!)
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          firstname,
          lastname,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: true,
        }
      );

      // 3. Handle backend response
      if (response.data.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError("Registration failed: Backend error.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code?.includes("auth/")) {
        setError("Firebase error: " + err.message);
      } else {
        setError(err.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div id="signup-screen" role="form">
      <div className="signup-container">
        <form onSubmit={collectData}>
          <h1>Sign Up</h1>

          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="First Name"
              aria-label="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Last Name"
              aria-label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="register-button">Sign Up</button>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      <div className="already-member">
        <span>Already a member? </span>
        <Link to="/login" id="login-link" aria-label="Log In">
          Log In
        </Link>
      </div>
    </div>
  );
}