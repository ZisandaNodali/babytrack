import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hash = (str) => btoa(str);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] === hash(password)) {
      localStorage.setItem("currentUser", username);
      onLogin(username);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-600">Sign in to continue your journey</p>
      </div>
      
      <div className="space-y-4">
        <input
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          onClick={handleLogin} 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl transition-colors duration-200 shadow-lg"
        >
          I'M RETURNING TO SIGN IN
        </button>
      </div>
    </div>
  );
}
