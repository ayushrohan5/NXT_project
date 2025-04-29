import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 Import Link from react-router-dom
import axios from "axios";
import { saveToken } from "../utils/auth";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://nxt-project.vercel.app/api/auth/register", form);
      saveToken(data.token);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="login-input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button type="submit" className="login-button">Register</button>
        <p className="login-footer">
          Already registered? <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
