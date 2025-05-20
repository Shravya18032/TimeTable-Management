import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../App.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('hod'); // use lowercase to match backend
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    section: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const response = await axios.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');

      // Role-based navigation fix:
      if (user.role === 'admin') {
        navigate('/admin-upload');
      } else {
        navigate(`/${user.role}`);
      }
    } else {
      await axios.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        department: form.department,
        role: role.toLowerCase(),
        section: role === 'student' ? form.section : undefined,
      });

      alert('Registration successful! You can now log in.');
      setIsLogin(true);
      setForm({
        name: '',
        email: '',
        password: '',
        department: '',
        section: '',
      });
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Something went wrong');
  }
};


  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value.toLowerCase())}
          required
        >
          <option value="hod">HOD</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
            <option value="admin">Admin</option>
        </select>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
            {role === 'student' && (
              <input
                type="text"
                placeholder="Section"
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                required
              />
            )}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p style={{ textAlign: 'center' }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          className="toggle-button"
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({
              name: '',
              email: '',
              password: '',
              department: '',
              section: '',
            });
          }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
