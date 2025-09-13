import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("/api/auth_router/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (res.ok) {
        alert("Signup successful! Please login.");
        // Optionally redirect to login page
      } else {
        const data = await res.json();
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(24,24,27,0.96)",
          padding: "2.2rem 1.5rem",
          borderRadius: "18px",
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.65), 0 1.5px 8px 0 #7c3aed33",
          border: "2px solid #7c3aed",
          width: "100%",
          maxWidth: "480px", // Increased width here
          color: "#fff",
          position: "relative",
          backdropFilter: "blur(8px) saturate(140%)",
          transition: "box-shadow 0.2s, border 0.2s",
          fontSize: "0.97rem"
        }}
      >
        {/* <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}>
          <img src="/logo.svg" alt="Logo" style={{ width: 30, height: 30, borderRadius: 8, boxShadow: "0 2px 8px #7c3aed44" }} />
        </div>  */ }
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <img src="/logo.svg" alt="Logo" style={{ width: 48, height: 48, borderRadius: 14, boxShadow: '0 2px 8px #7c3aed44' }} />
        </div>
        <h2 style={{ textAlign: "center", marginBottom: "0.3rem", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-1px" }}>
          Create Account
        </h2>
        <p style={{ textAlign: "center", marginBottom: "1.1rem", color: "#b3b3b3", fontSize: "0.93rem" }}>
          Sign up for your account
        </p>

        <div style={{ marginBottom: "0.8rem" }}>
          <label style={{ fontWeight: 600, marginBottom: "0.2rem", display: "block", fontSize: "0.93rem", textAlign: "left" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "0.55rem 0.7rem",
              borderRadius: "7px",
              border: "1.2px solid #232329",
              background: "#18181b",
              color: "#fff",
              fontSize: "0.93rem",
              outline: "none",
              transition: "border 0.2s, box-shadow 0.2s",
              marginTop: "0.1rem",
              boxShadow: "0 1px 4px #23232922 inset",
            }}
            required
            onFocus={e => (e.currentTarget.style.border = "1.2px solid #7c3aed")}
            onBlur={e => (e.currentTarget.style.border = "1.2px solid #232329")}
          />
        </div>

        <div style={{ marginBottom: "0.8rem" }}>
          <label style={{ fontWeight: 600, marginBottom: "0.2rem", display: "block", fontSize: "0.93rem", textAlign: "left" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "0.55rem 0.7rem",
              borderRadius: "7px",
              border: "1.2px solid #232329",
              background: "#18181b",
              color: "#fff",
              fontSize: "0.93rem",
              outline: "none",
              transition: "border 0.2s, box-shadow 0.2s",
              marginTop: "0.1rem",
              boxShadow: "0 1px 4px #23232922 inset",
            }}
            required
            onFocus={e => (e.currentTarget.style.border = "1.2px solid #7c3aed")}
            onBlur={e => (e.currentTarget.style.border = "1.2px solid #232329")}
          />
        </div>

        <div style={{ marginBottom: "0.8rem" }}>
          <label style={{ fontWeight: 600, marginBottom: "0.2rem", display: "block", fontSize: "0.93rem", textAlign: "left" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "0.55rem 0.7rem",
              borderRadius: "7px",
              border: "1.2px solid #232329",
              background: "#18181b",
              color: "#fff",
              fontSize: "0.93rem",
              outline: "none",
              transition: "border 0.2s, box-shadow 0.2s",
              marginTop: "0.1rem",
              boxShadow: "0 1px 4px #23232922 inset",
            }}
            required
            onFocus={e => (e.currentTarget.style.border = "1.2px solid #7c3aed")}
            onBlur={e => (e.currentTarget.style.border = "1.2px solid #232329")}
          />
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={{ fontWeight: 600, marginBottom: "0.2rem", display: "block", fontSize: "0.93rem", textAlign: "left" }}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            style={{
              width: "100%",
              padding: "0.55rem 0.7rem",
              borderRadius: "7px",
              border: "1.2px solid #232329",
              background: "#18181b",
              color: "#fff",
              fontSize: "0.93rem",
              outline: "none",
              transition: "border 0.2s, box-shadow 0.2s",
              marginTop: "0.1rem",
              boxShadow: "0 1px 4px #23232922 inset",
            }}
            required
            onFocus={e => (e.currentTarget.style.border = "1.2px solid #7c3aed")}
            onBlur={e => (e.currentTarget.style.border = "1.2px solid #232329")}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "7px",
            background: "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.97rem",
            border: "none",
            cursor: "pointer",
            marginBottom: "0.8rem",
            boxShadow: "0 2px 8px #7c3aed33",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        >
          Sign Up
        </button>

        <div style={{ textAlign: "center", color: "#b3b3b3", fontSize: "0.93rem" }}>
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.color = "#fff")}
            onMouseOut={e => (e.currentTarget.style.color = "#a78bfa")}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}