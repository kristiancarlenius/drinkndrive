// Schedule appointment page
import React, { useState } from 'react';

function Schedule() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to schedule.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to schedule');
      }

      setMessage('Schedule submitted successfully!');
      setFormData({ date: '', time: '', location: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Schedule an Appointment</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Date:</label><br />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Time:</label><br />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Location:</label><br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Schedule;