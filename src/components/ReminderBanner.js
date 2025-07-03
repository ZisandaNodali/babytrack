import React, { useEffect, useState } from 'react';

export default function ReminderBanner() {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem('lastReminderDate');
    const today = new Date();
    
    if (!lastSeen) {
      setShowReminder(true);
    } else {
      const last = new Date(lastSeen);
      const daysSince = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (daysSince >= 7) {
        setShowReminder(true);
      }
    }
  }, []);

  const dismissReminder = () => {
    localStorage.setItem('lastReminderDate', new Date().toISOString());
    setShowReminder(false);
  };

  if (!showReminder) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded mb-4">
      <div className="flex justify-between items-center">
        <p>
          🕒 It's time to check your pregnancy or baby care tips!
        </p>
        <button
          onClick={dismissReminder}
          className="ml-4 text-sm bg-yellow-300 px-2 py-1 rounded"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
