import React, { useEffect, useState } from "react";
import { addWeeks, format, isAfter, isEqual } from "date-fns";

export default function VisitReminder() {
  const [nextVisit, setNextVisit] = useState(null);

  useEffect(() => {
    const lmp = localStorage.getItem("lmp");
    if (!lmp) return;

    const lmpDate = new Date(lmp);
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

    const today = new Date();
    const next = visits.find(
      (visitDate) => isEqual(visitDate, today) || isAfter(visitDate, today)
    );

    if (next) {
      setNextVisit(format(next, "yyyy-MM-dd"));
    }
  }, []);

  if (!nextVisit) return null;

  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-900 p-4 rounded mb-4 text-center">
      📅 Your next antenatal visit is on <strong>{nextVisit}</strong>
    </div>
  );
}
