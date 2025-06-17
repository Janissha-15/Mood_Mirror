import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Updated filename here

const BACKEND_URL =
  "https://0a8027a8-5101-4ea7-a058-14df90716a40-00-blwls7y3w3ni.pike.replit.dev";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      alert("🎉 Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-form">
          <h2 className="register-heading">Create Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
            placeholder="Choose a username"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            placeholder="your@email.com"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            placeholder="••••••••"
          />

          <button onClick={handleRegister} className="register-button">
            Register
          </button>

          <p className="register-login">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>

        <div className="register-image"></div>
      </div>
    </div>
  );
}

export default Register;
