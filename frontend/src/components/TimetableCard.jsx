import React from 'react';

const TimetableCard = ({ department, semester, section, role, imagePath }) => (
  <div className="border rounded-md shadow p-4 mb-4">
    <h3 className="text-lg font-semibold mb-1">{department.toUpperCase()} - Sem {semester} - Sec {section}</h3>
    <p className="text-sm text-gray-600 mb-2">Role: {role.toUpperCase()}</p>
    <img src={`http://localhost:5000${imagePath}`} alt="Timetable" className="w-full h-auto" />
  </div>
);

export default TimetableCard;