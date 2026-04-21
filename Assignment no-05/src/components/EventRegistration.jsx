import { useState } from 'react';
import '../styles/EventRegistration.css';

export default function EventRegistration({ event, onBack, onConfirm }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.rollNumber || !formData.department) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      onConfirm(event, formData);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="registration-container">
        <div className="success-message">
          <h2>✓ Registration Successful!</h2>
          <p>Thank you for registering for <strong>{event.title}</strong></p>
          <p>A confirmation email will be sent to {formData.email}</p>
          <div className="event-summary">
            <h3>Event Details:</h3>
            <p><strong>Event:</strong> {event.title}</p>
            <p><strong>Club:</strong> {event.clubName}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <button className="back-btn" onClick={onBack}>← Cancel Registration</button>
      
      <div className="registration-form-wrapper">
        <div className="event-info">
          <h2>{event.image} {event.title}</h2>
          <p>Please fill in your details to complete the registration</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number *</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            ✓ Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
}
