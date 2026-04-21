import '../styles/EventDetails.css';

export default function EventDetails({ event, onBack, onRegister }) {
  if (!event) {
    return null;
  }

  const spotsAvailable = event.capacity - event.registered;
  const percentageFilled = Math.round((event.registered / event.capacity) * 100);

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={onBack}>← Back to Events</button>
      
      <div className="event-details-content">
        <div className="event-header">
          <div className="event-icon">{event.image}</div>
          <h2>{event.title}</h2>
        </div>

        <div className="details-grid">
          <div className="detail-section">
            <h3>📋 General Information</h3>
            <div className="detail-item">
              <strong>Club:</strong> <span>{event.clubName}</span>
            </div>
            <div className="detail-item">
              <strong>Date:</strong> <span>{event.date}</span>
            </div>
            <div className="detail-item">
              <strong>Time:</strong> <span>{event.time}</span>
            </div>
            <div className="detail-item">
              <strong>Location:</strong> <span>{event.location}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>📝 Description</h3>
            <p className="description">
              {event.description}
            </p>
          </div>

          <div className="detail-section">
            <h3>👥 Capacity Status</h3>
            <div className="capacity-details">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${percentageFilled}%` }}
                ></div>
              </div>
              <div className="capacity-stats">
                <p>Total Capacity: <strong>{event.capacity}</strong></p>
                <p>Already Registered: <strong>{event.registered}</strong></p>
                <p>Spots Available: <strong className="available">{spotsAvailable}</strong></p>
                <p>Filled: <strong>{percentageFilled}%</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          {spotsAvailable > 0 ? (
            <button 
              className="register-btn"
              onClick={() => onRegister(event)}
            >
              ✓ Register for Event
            </button>
          ) : (
            <button className="register-btn disabled">
              Event is Full
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
