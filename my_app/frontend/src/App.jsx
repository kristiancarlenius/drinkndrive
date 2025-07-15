// Main React component
import React from 'react';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import EmployeeMap from './pages/EmployeeMap';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        <Link to="/schedule" style={{ marginRight: '1rem' }}>Schedule</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employeemap">EmployeeMap</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeemap" element={<EmployeeMap />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;