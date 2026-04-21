import { useState } from 'react';
import './App.css';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import EventRegistration from './components/EventRegistration';
import ClubActivities from './components/ClubActivities';

export default function App() {
  const [currentView, setCurrentView] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setCurrentView('details');
  };

  const handleBackFromDetails = () => {
    setCurrentView('events');
    setSelectedEvent(null);
  };

  const handleRegisterEvent = (event) => {
    setCurrentView('registration');
  };

  const handleCancelRegistration = () => {
    setCurrentView('details');
  };

  const handleConfirmRegistration = (event, formData) => {
    
    setRegisteredEvents([...registeredEvents, { event, formData, registeredAt: new Date() }]);
    alert(`Successfully registered for ${event.title}!`);
    setCurrentView('events');
    setSelectedEvent(null);
  };

  const handleBackFromRegistration = () => {
    setCurrentView('details');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          
          <h1 className="app-title">Welcome to Sanjivani College Event Hub </h1>
          <p className="app-subtitle">Explore Technical Events, Cultural Programs, Sports Activities, and Student Clubs of Sanjivani College of Engineering
</p>
</div>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${currentView === 'events' || currentView === 'details' || currentView === 'registration' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('events');
            setSelectedEvent(null);
          }}
        >
          📅 Events
        </button>
        <button 
          className={`nav-btn ${currentView === 'clubs' ? 'active' : ''}`}
          onClick={() => setCurrentView('clubs')}
        >
          🏢 Clubs
        </button>
        <div className="registration-counter">
          <span>📝 Registered: {registeredEvents.length}</span>
        </div>
      </nav>

      <main className="app-main">
        {currentView === 'events' && (
          <EventsList onSelectEvent={handleSelectEvent} />
        )}

        {currentView === 'details' && selectedEvent && (
          <EventDetails 
            event={selectedEvent}
            onBack={handleBackFromDetails}
            onRegister={handleRegisterEvent}
          />
        )}

        {currentView === 'registration' && selectedEvent && (
          <EventRegistration 
            event={selectedEvent}
            onBack={handleBackFromRegistration}
            onConfirm={handleConfirmRegistration}
          />
        )}

        {currentView === 'clubs' && (
          <ClubActivities />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Campus Event Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}