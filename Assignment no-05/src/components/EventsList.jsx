import { useState } from 'react';
import '../styles/EventsList.css';

export default function EventsList({ onSelectEvent }) {
 const [events, setEvents] = useState([
  {
    id: 1,
    title: "Code Kesari Coding Competition",
    clubName: "ITERA",
    date: "2026-03-18",
    time: "10:00 AM",
    location: "Computer Lab 1",
    capacity: 80,
    registered: 56,
    image: "💻"
  },
  {
    id: 2,
    title: "Code War Programming Battle",
    clubName: "CSI Student Chapter",
    date: "2026-03-22",
    time: "11:00 AM",
    location: "Computer Lab 2",
    capacity: 70,
    registered: 50,
    image: "⚔️"
  },
  {
    id: 3,
    title: "MATLAB & Automation Workshop",
    clubName: "EESA",
    date: "2026-03-25",
    time: "2:00 PM",
    location: "Electrical Lab",
    capacity: 60,
    registered: 40,
    image: "⚡"
  },
  {
    id: 4,
    title: "Automobile Technology Seminar",
    clubName: "SAE Collegiate Club",
    date: "2026-03-28",
    time: "3:00 PM",
    location: "Mechanical Seminar Hall",
    capacity: 90,
    registered: 65,
    image: "🚗"
  },
  {
    id: 5,
    title: "Android App Development Workshop",
    clubName: "Google Developer Student Club",
    date: "2026-04-02",
    time: "2:30 PM",
    location: "Computer Lab 3",
    capacity: 75,
    registered: 55,
    image: "🌐"
  },
  {
    id: 6,
    title: "IT Cricket Tournament",
    clubName: "ITERA",
    date: "2026-04-05",
    time: "8:00 AM",
    location: "College Ground",
    capacity: 120,
    registered: 90,
    image: "🏏"
  },
  {
    id: 7,
    title: "Dance Battle Competition",
    clubName: "S-Steppers",
    date: "2026-04-10",
    time: "6:00 PM",
    location: "College Auditorium",
    capacity: 200,
    registered: 150,
    image: "💃"
  },
  {
    id: 8,
    title: "Music Night & Singing Competition",
    clubName: "SAAZ Music Club",
    date: "2026-04-12",
    time: "7:00 PM",
    location: "Open Stage",
    capacity: 180,
    registered: 130,
    image: "🎵"
  },
  {
    id: 9,
    title: "Short Film Making Competition",
    clubName: "Sanjivani Cinema",
    date: "2026-04-15",
    time: "4:00 PM",
    location: "Seminar Hall",
    capacity: 100,
    registered: 70,
    image: "🎬"
  },
  {
    id: 10,
    title: "College TechFest Hackathon",
    clubName: "ITERA",
    date: "2026-04-20",
    time: "9:00 AM",
    location: "Innovation Lab",
    capacity: 100,
    registered: 80,
    image: "🚀"
  }
]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-list-container">
      <h2>📅 Upcoming Events</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events by title or club name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.image}</div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="club-name">🏢 {event.clubName}</p>
                <p className="event-date">📍 {event.date} at {event.time}</p>
                <p className="event-location">📍 {event.location}</p>
                <div className="capacity-info">
                  <span>{event.registered}/{event.capacity} Registered</span>
                </div>
                <button
                  className="view-details-btn"
                  onClick={() => onSelectEvent(event)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No events found matching your search.</div>
        )}
      </div>
    </div>
  );
}
