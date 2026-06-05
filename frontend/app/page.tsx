"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleAuth = async () => {
  try {
    const endpoint = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    alert(isLogin ? "Login successful!" : "Account created!");

  } catch (err) {
    console.error(err);
    alert("Server connection failed");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "sans-serif",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(to bottom right, #165A50, #0f3d36)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Momento
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "450px",
            color: "#dbe4e2",
          }}
        >
          Organize your academic life, manage priorities,
          and stay mindful while staying productive.
        </p>

        <div
          style={{
            marginTop: "40px",
            opacity: 0.8,
            fontSize: "14px",
          }}
        >
          THE MINDFUL SCHOLAR
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              color: "#165A50",
              marginBottom: "10px",
            }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p style={{ color: "#64748B" }}>
            {isLogin
              ? "Login to continue your productivity journey."
              : "Start organizing your tasks and goals."}
          </p>

          {!isLogin && (
            <input
  type="text"
  placeholder="Full Name"
  style={inputStyle}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

          )}
          <input
  type="email"
  placeholder="Email"
  style={inputStyle}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <input
  type="password"
  placeholder="Password"
  style={inputStyle}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          <button
  onClick={handleAuth}
  style={{
              height: "50px",
              border: "none",
              borderRadius: "12px",
              background: "#165A50",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#64748B",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  height: "50px",
  color: "black",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  padding: "0 15px",
  outline: "none",
  fontSize: "14px",
  background: "#f8fafc",
};