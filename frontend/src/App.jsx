import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import AdminUpload from './pages/AdminUpload';
import HODView from './pages/HODView';
import FacultyView from './pages/FacultyView';
import StudentView from './pages/StudentView';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-upload" element={<AdminUpload />} />
      <Route path="/hod" element={<HODView />} />
      <Route path="/faculty" element={<FacultyView />} />
      <Route path="/student" element={<StudentView />} />
      <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '4rem' }}>404 - Page Not Found</h1>} />
    </Routes>
  </Router>
);

export default App;
