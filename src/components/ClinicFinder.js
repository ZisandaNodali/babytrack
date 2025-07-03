import React, { useState, useEffect } from "react";
import clinicsData from "../data/clinics.json";

export default function ClinicFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClinics, setFilteredClinics] = useState(clinicsData);

  useEffect(() => {
    const filtered = clinicsData.filter(clinic =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.services.some(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredClinics(filtered);
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nearby Clinics</h2>
      <input
        type="text"
        placeholder="Search clinic, location or service..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <ul className="space-y-4">
        {filteredClinics.map((clinic, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{clinic.name}</h3>
            <p><strong>Location:</strong> {clinic.location}</p>
            <p><strong>Services:</strong> {clinic.services.join(", ")}</p>
            <p><strong>Address:</strong> {clinic.address}</p>
            <p><strong>Contact:</strong> {clinic.contact}</p>
            <p><strong>Open:</strong> {clinic.openHours}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
