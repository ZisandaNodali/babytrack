import React, { useState } from "react";
// Symptom Checker Component
const momSymptoms = [
  {
    id: 1,
    symptom: "Severe headache",
    advice: "See a clinic immediately — could be preeclampsia.",
    urgent: true,
  },
  {
    id: 2,
    symptom: "Swelling of face or hands",
    advice: "Visit the clinic today for checkup.",
    urgent: true,
  },
  {
    id: 3,
    symptom: "Heavy vaginal bleeding",
    advice: "Seek emergency care immediately.",
    urgent: true,
  },
  {
    id: 4,
    symptom: "Mild nausea",
    advice: "Drink plenty of fluids and rest.",
    urgent: false,
  },
  // add more as needed
];

const babySymptoms = [
  {
    id: 1,
    symptom: "Fever over 38°C",
    advice: "Take baby to clinic for assessment.",
    urgent: true,
  },
  {
    id: 2,
    symptom: "Difficulty breathing",
    advice: "Seek emergency care immediately.",
    urgent: true,
  },
  {
    id: 3,
    symptom: "Poor feeding",
    advice: "Try to feed frequently and monitor.",
    urgent: false,
  },
  {
    id: 4,
    symptom: "Lethargy or low activity",
    advice: "Bring baby to health worker soon.",
    urgent: true,
  },
  // add more as needed
];

export default function SymptomChecker() {
  const [activeTab, setActiveTab] = useState("mom");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptomsList = activeTab === "mom" ? momSymptoms : babySymptoms;

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedDetails = symptomsList.filter((sym) =>
    selectedSymptoms.includes(sym.id)
  );

  const urgentSymptoms = selectedDetails.filter((sym) => sym.urgent);

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">🩺 Symptom Checker</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setActiveTab("mom");
            setSelectedSymptoms([]);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === "mom"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Mom Symptoms
        </button>
        <button
          onClick={() => {
            setActiveTab("baby");
            setSelectedSymptoms([]);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === "baby"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Baby Symptoms
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto mb-4 border rounded p-2">
        {symptomsList.map(({ id, symptom }) => (
          <label key={id} className="block mb-2">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(id)}
              onChange={() => toggleSymptom(id)}
              className="mr-2 accent-purple-600"
            />
            {symptom}
          </label>
        ))}
      </div>

      {selectedDetails.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
          <h3 className="font-semibold mb-2">Advice:</h3>
          <ul className="list-disc list-inside">
            {selectedDetails.map(({ id, advice }) => (
              <li key={id}>{advice}</li>
            ))}
          </ul>

          {urgentSymptoms.length > 0 && (
            <p className="mt-3 text-red-700 font-bold">
              ⚠️ One or more symptoms require urgent medical attention!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
