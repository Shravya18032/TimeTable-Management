import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import TimetableCard from '../components/TimetableCard';
import axios from '../services/api';

const StudentView = () => {
  const [search, setSearch] = useState('');
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    axios.get('/timetable/search?role=student')
      .then(res => setTimetables(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = timetables.filter(t => t.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className="p-6">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by department..." />
        {filtered.map(t => (
          <TimetableCard
            key={t._id}
            department={t.department}
            semester={t.semester}
            section={t.section}
            role={t.role}
            imagePath={t.imagePath}
          />
        ))}
      </div>
    </>
  );
};

export default StudentView;