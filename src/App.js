import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PregnancyTracker from "./components/PregnancyTracker";
import VaccineTracker from "./components/VaccineTracker";
import HealthTips from "./components/HealthTips";
import ReminderBanner from "./components/ReminderBanner";
import VisitReminder from "./components/VisitReminder";
import Register from "./components/Register";
import Login from "./components/Login";
import SymptomChecker from './components/SymptomChecker';
import BabyGrowthTracker from './components/BabyGrowthTracker';
import ClinicFinder from "./components/ClinicFinder";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowLogin(true);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <div className="text-4xl">👩‍👶</div>
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">👶 Baby Track</h1>
            <p className="text-white/90 text-lg font-medium">
              Your sidekick for life's<br />little moments
            </p>
          </div>

          <div className="bg-white rounded-t-3xl px-6 py-8 min-h-[300px]">
            {showLogin ? (
              <>
                <Login onLogin={setCurrentUser} />
                <p className="text-center mt-6 text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    className="text-teal-600 font-semibold underline"
                    onClick={() => setShowLogin(false)}
                  >
                    Register
                  </button>
                </p>
              </>
            ) : (
              <>
                <Register onRegister={setCurrentUser} />
                <p className="text-center mt-6 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-teal-600 font-semibold underline"
                    onClick={() => setShowLogin(true)}
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-700 text-white p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-6">👶 BabyTrack</h1>
          <nav className="space-y-3">
            <Link to="/pregnancy" className="block hover:bg-teal-600 p-2 rounded">Pregnancy Tracker</Link>
            <Link to="/vaccines" className="block hover:bg-teal-600 p-2 rounded">Vaccine Tracker</Link>
            <Link to="/symptoms" className="block hover:bg-teal-600 p-2 rounded">Symptom Checker</Link>
            <Link to="/growth" className="block hover:bg-teal-600 p-2 rounded">Growth Tracker</Link>
            <Link to="/clinics" className="block hover:bg-teal-600 p-2 rounded">Nearby Clinics</Link>
            <Link to="/tips" className="block hover:bg-teal-600 p-2 rounded">Health Tips</Link>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-10 bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-xl mb-6">
            <h2 className="text-xl font-semibold">Welcome back!</h2>
            <p className="text-sm text-teal-100">Track your baby's journey with ease.</p>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="/pregnancy" />} />
            <Route path="/pregnancy" element={<><VisitReminder /><ReminderBanner /><PregnancyTracker /></>} />
            <Route path="/vaccines" element={<VaccineTracker />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/growth" element={<BabyGrowthTracker />} />
            <Route path="/clinics" element={<ClinicFinder />} />
            <Route path="/tips" element={<HealthTips />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
