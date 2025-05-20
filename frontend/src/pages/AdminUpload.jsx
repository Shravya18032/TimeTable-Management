import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../services/api';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('timetable', file);
    formData.append('department', department);
    formData.append('semester', semester);
    formData.append('section', section);
    formData.append('role', role);

    try {
      await axios.post('/timetable/upload', formData);
      alert('Uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Admin Timetable Upload</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="border p-2 w-full" required />
          <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semester" className="border p-2 w-full" required />
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder="Section" className="border p-2 w-full" required />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 w-full">
            <option value="hod">HOD</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full" required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Upload</button>
        </form>
      </div>
    </>
  );
};

export default AdminUpload;