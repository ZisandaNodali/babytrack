import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// Baby Growth Tracker Component
export default function BabyGrowthTracker() {
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedBirthDate = localStorage.getItem("babyBirthDate");
    const savedRecords = JSON.parse(localStorage.getItem("babyWeightRecords")) || [];
    if (savedBirthDate) setBirthDate(savedBirthDate);
    setRecords(savedRecords);
  }, []);

  useEffect(() => {
    localStorage.setItem("babyBirthDate", birthDate);
    localStorage.setItem("babyWeightRecords", JSON.stringify(records));
  }, [birthDate, records]);

  const addRecord = () => {
    if (!weight || isNaN(weight) || weight <= 0) {
      alert("Please enter a valid positive weight (kg).");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setRecords((prev) => [...prev, { date: today, weight: parseFloat(weight) }]);
    setWeight("");
  };

  const getGrowthAdvice = () => {
    if (records.length === 0) return null;
    const latest = records[records.length - 1].weight;
    if (latest < 2.5) {
      return "⚠️ Baby's weight is below 2.5kg — please consult your health worker.";
    }
    if (records.length >= 2) {
      const prev = records[records.length - 2].weight;
      if (latest <= prev) {
        return "⚠️ Weight hasn’t increased since last check — monitor closely and consult if no gain soon.";
      }
    }
    return "👍 Growth looks good. Keep monitoring regularly.";
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">📈 Baby Growth Tracker</h2>

      <label className="block mb-2">
        Baby's Date of Birth:
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Enter Baby's Weight (kg):
        <input
          type="number"
          step="0.01"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <button
        onClick={addRecord}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Weight Record
      </button>

      {records.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Weight Records:</h3>
          <ul className="list-disc list-inside mb-4 max-h-48 overflow-y-auto">
            {records.map(({ date, weight }, idx) => (
              <li key={idx}>
                {date}: {weight.toFixed(2)} kg
              </li>
            ))}
          </ul>

          <div className="p-3 bg-yellow-100 rounded text-yellow-800 font-semibold mb-4">
            {getGrowthAdvice()}
          </div>

          <h3 className="font-semibold mb-2">Weight Over Time:</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={records}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis unit="kg" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
