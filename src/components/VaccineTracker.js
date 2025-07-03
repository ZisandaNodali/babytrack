import React, { useState, useEffect } from 'react';

const VaccineTracker = () => {
  const [birthDate, setBirthDate] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [completed, setCompleted] = useState({});

  const vaccines = [
    { name: 'BCG', weeksAfterBirth: 0 },
    { name: 'Polio', weeksAfterBirth: 6 },
    { name: 'DTP', weeksAfterBirth: 6 },
    { name: 'Measles', weeksAfterBirth: 36 },
  ];

  useEffect(() => {
    const savedCompleted = localStorage.getItem('vaccineCompleted');
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));

    const savedBirthDate = localStorage.getItem('babyBirthDate');
    if (savedBirthDate) {
      setBirthDate(savedBirthDate);
      calculateSchedule(savedBirthDate);
    }
  }, []);

  const calculateSchedule = (date) => {
    if (!date) return;

    const birth = new Date(date);
    const scheduleList = vaccines.map(vaccine => {
      const dueDate = new Date(birth);
      dueDate.setDate(birth.getDate() + vaccine.weeksAfterBirth * 7);
      return { ...vaccine, dueDate: dueDate.toDateString() };
    });

    setSchedule(scheduleList);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setBirthDate(date);
    calculateSchedule(date);
    localStorage.setItem('babyBirthDate', date);
  };

  const toggleCompleted = (name) => {
    const updated = { ...completed, [name]: !completed[name] };
    setCompleted(updated);
    localStorage.setItem('vaccineCompleted', JSON.stringify(updated));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-teal-800">💉 Baby Vaccine Tracker</h2>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Baby's Date of Birth:
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={handleDateChange}
          className="border p-2 w-full rounded-md"
        />
      </div>

      {schedule.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Vaccine Schedule</h3>
          <p className="text-sm text-gray-500">Click a vaccine to mark it as given.</p>

          <ul className="space-y-2">
            {schedule.map(({ name, dueDate }) => (
              <li
                key={name}
                onClick={() => toggleCompleted(name)}
                className={`cursor-pointer p-3 rounded-lg border 
                  ${completed[name] ? "bg-green-50 border-green-500 text-green-700 line-through" : "bg-gray-50 hover:bg-gray-100"}
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{name}</span>
                  <span className="text-sm">Due: {dueDate}</span>
                </div>
                {completed[name] && <span className="text-green-600 text-sm mt-1 block">✔️ Completed</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VaccineTracker;
