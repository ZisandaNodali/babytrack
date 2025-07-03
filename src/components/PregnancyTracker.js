import React, { useState, useEffect } from "react";
import { format, addWeeks } from "date-fns";
//Pregnacy Tracker Component
export default function PregnancyTracker() {
  const [momName, setMomName] = useState("");
  const [lmp, setLmp] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checkups, setCheckups] = useState([]);
  const [completedCheckups, setCompletedCheckups] = useState([]);

  useEffect(() => {
    const savedMomName = localStorage.getItem("momName");
    const savedLmp = localStorage.getItem("lmp");
    const savedCompleted = JSON.parse(localStorage.getItem("completedCheckups")) || [];

    if (savedMomName) setMomName(savedMomName);
    if (savedLmp) {
      setLmp(savedLmp);
      calculateDueDateAndCheckups(savedLmp);
    }
    setCompletedCheckups(savedCompleted);
  }, []);

  const calculateDueDateAndCheckups = (lmpDateString) => {
    if (!lmpDateString) return;

    const lmpDate = new Date(lmpDateString);
    const edd = addWeeks(lmpDate, 40);
    setDueDate(format(edd, "yyyy-MM-dd"));

    let visits = [];
    for (let week = 4; week <= 28; week += 4) {
      visits.push(addWeeks(lmpDate, week));
    }
    for (let week = 30; week <= 36; week += 2) {
      visits.push(addWeeks(lmpDate, week));
    }
    for (let week = 37; week <= 40; week++) {
      visits.push(addWeeks(lmpDate, week));
    }

    const formattedVisits = visits.map((date) => format(date, "yyyy-MM-dd"));
    setCheckups(formattedVisits);
  };

  const handleCalculateClick = () => {
    calculateDueDateAndCheckups(lmp);
    localStorage.setItem("momName", momName);
    localStorage.setItem("lmp", lmp);
  };

  const toggleCheckupDone = (date) => {
    let updated;
    if (completedCheckups.includes(date)) {
      updated = completedCheckups.filter((d) => d !== date);
    } else {
      updated = [...completedCheckups, date];
    }
    setCompletedCheckups(updated);
    localStorage.setItem("completedCheckups", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold">🤰 Pregnancy Tracker</h2>
      <input
        type="text"
        placeholder="Mother's Name"
        value={momName}
        onChange={(e) => setMomName(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="date"
        value={lmp}
        onChange={(e) => setLmp(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleCalculateClick}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Calculate Due Date & Checkups
      </button>

      {dueDate && (
        <p>
          <strong>{momName}</strong> is due on <strong>{dueDate}</strong>
        </p>
      )}

      {checkups.length > 0 && (
        <div>
            <h3 className="font-semibold mt-4">Antenatal Checkup Dates:</h3>
            
            <p className="text-sm text-gray-600 mb-2">
            ✅ {completedCheckups.length} of {checkups.length} visits completed
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
              {checkups.map((date, idx) => (
                <label
                  key={idx}
                  className="flex items-center bg-purple-50 border border-purple-200 p-2 rounded-lg cursor-pointer hover:bg-purple-100 transition"
                >
                  <input
                    type="checkbox"
                    checked={completedCheckups.includes(date)}
                    onChange={() => toggleCheckupDone(date)}
                    className="accent-purple-600 mr-2"
                  />
                  <span
                    className={
                      completedCheckups.includes(date)
                        ? "line-through text-gray-500 text-sm"
                        : "text-sm"
                    }
                  >
                    {date}
                  </span>
                </label>
              ))}
            </div>

        </div>
        )}
    </div>
  );
}
