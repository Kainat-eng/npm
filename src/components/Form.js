import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const collectData = async (e) => {
        e.preventDefault();

        try {
            // Axios POST request to backend
            const response = await axios.post('http://localhost:4000/register', {
                firstname,
                lastname,
                email,
                password,
            });

            // Save the returned user data in localStorage
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                alert("Registration successful!");
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
            alert(error.response?.data || "Something went wrong!");
        }
    };

    return (
        <div id="signup-screen" role="form">
            <div className="signup-container">
                <form onSubmit={collectData}>
                    <h1>Sign Up</h1>

                    {/* First Name Field */}
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

                    {/* Last Name Field */}
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

                    {/* Email Field */}
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

                    {/* Password Field */}
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

                    {/* Submit Button */}
                    <button type="submit" id="register-button">
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Already a Member Link */}
            <div className="already-member">
                <span>Already a member? </span>
                <Link to="/login" id="login-link" aria-label="Log In">
                    Log In
                </Link>
            </div>
        </div>
    );
}
