import React from 'react';
// Health Tips Component
const tips = {
  pregnancy: [
    "Eat a balanced diet rich in vitamins and minerals.",
    "Stay hydrated and drink plenty of water.",
    "Attend all antenatal checkups as scheduled.",
    "Avoid alcohol, smoking, and harmful substances.",
    "Get regular gentle exercise, like walking."
  ],
  baby: [
    "Breastfeed exclusively for the first 6 months if possible.",
    "Keep your baby’s vaccination schedule up to date.",
    "Watch for danger signs: fever, difficulty breathing, poor feeding.",
    "Maintain good hygiene and clean feeding bottles.",
    "Ensure safe sleeping position to reduce SIDS risk."
  ]
};

export default function HealthTips() {
  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold">📚 Health Tips</h2>
      
      <div>
        <h3 className="font-semibold">Pregnancy Tips</h3>
        <ul className="list-disc list-inside">
          {tips.pregnancy.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Baby Care Tips</h3>
        <ul className="list-disc list-inside">
          {tips.baby.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
