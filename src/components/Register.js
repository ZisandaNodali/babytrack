import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hash = (str) => btoa(str); // Simple hash

  const handleRegister = () => {
    const existing = JSON.parse(localStorage.getItem("users")) || {};
    if (existing[username]) {
      alert("User already exists");
      return;
    }

    existing[username] = hash(password);
    localStorage.setItem("users", JSON.stringify(existing));
    localStorage.setItem("currentUser", username);
    onRegister(username);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-600">Join us on this beautiful journey</p>
      </div>
      
      <div className="space-y-4">
        <input
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          onClick={handleRegister} 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl transition-colors duration-200 shadow-lg"
        >
          I'M NEW
        </button>
      </div>
    </div>
  );
}
