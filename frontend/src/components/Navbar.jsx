import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">Timetable Manager</div>
    <div className="space-x-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/admin-upload">Upload</Link>
      <Link to="/">Logout</Link>
    </div>
  </nav>
);
export default Navbar;
