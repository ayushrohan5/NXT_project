import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken } from "../utils/auth"; // Ensure this function saves the token
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://nxt-project.vercel.app/api/auth/login", form);
      saveToken(data.token); // Store the token in localStorage or sessionStorage
      alert("Logged in Successfully");
      navigate("/");
      window.location.reload(); 
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="login-button">Login</button>
        <p className="login-footer">
          New user? <Link to="/register" className="login-link">Signup</Link>
        </p>
      </form>
    </div>
  );
}
