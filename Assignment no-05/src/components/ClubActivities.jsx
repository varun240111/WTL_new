import { useState } from 'react';
import '../styles/ClubActivities.css';

export default function ClubActivities() {
 const [clubs] = useState([
  {
    id: 1,
    name: "ITERA",
    description: "Information Technology Engineer’s Relic Association – student association of the IT department organizing coding events, workshops, and technical activities.",
    activities: [
      "Code Kesari Coding Competition",
      "Surf & Present Competition",
      "Technical Workshops",
      "Hackathons",
      "Expert Lectures"
    ],
    members: 150,
    image: "💻"
  },
  {
    id: 2,
    name: "CSI Student Chapter",
    description: "Computer Society of India student chapter helping students improve programming and software development skills.",
    activities: [
      "Coding Competitions",
      "Technical Quiz",
      "Cyber Security Sessions",
      "Mini Project Competition",
      "Guest Lectures"
    ],
    members: 230,
    image: "🖥️"
  },
  {
    id: 3,
    name: "EESA",
    description: "Electrical Engineering Students Association organizing workshops, expert talks, aptitude tests, and technical programs.",
    activities: [
      "MATLAB Workshop",
      "Automation Expert Talks",
      "Engineering Knowledge Tests",
      "Aptitude Tests",
      "Group Discussions"
    ],
    members: 120,
    image: "⚡"
  },
  {
    id: 4,
    name: "SAE Collegiate Club",
    description: "Automotive engineering club promoting mobility technology and participating in national competitions like BAJA.",
    activities: [
      "Auto Quiz",
      "Bike Mania",
      "Project Exhibition",
      "Industrial Visits",
      "Automobile Workshops"
    ],
    members: 90,
    image: "🚗"
  },
  {
    id: 5,
    name: "Google Developer Student Club",
    description: "Community of student developers interested in Google technologies, app development, and cloud computing.",
    activities: [
      "Android Development Workshops",
      "Google Cloud Sessions",
      "Hackathons",
      "Coding Challenges"
    ],
    members: 140,
    image: "🌐"
  },
  {
    id: 6,
    name: "S-Steppers",
    description: "College dance club where students showcase their dancing talent in cultural events and annual gatherings.",
    activities: [
      "Dance Performances",
      "Annual Gathering Shows",
      "Dance Competitions",
      "Cultural Events"
    ],
    members: 80,
    image: "💃"
  },
  {
    id: 7,
    name: "SAAZ Music Club",
    description: "Music club encouraging students to perform singing and instrumental music during college events.",
    activities: [
      "Singing Competitions",
      "Live Music Performances",
      "Cultural Programs",
      "Annual Gathering Performances"
    ],
    members: 70,
    image: "🎵"
  },
  {
    id: 8,
    name: "Sanjivani Cinema",
    description: "Short film making club that promotes creativity in filmmaking, editing, and storytelling.",
    activities: [
      "Short Film Competitions",
      "Video Editing Workshops",
      "Film Screenings",
      "Creative Storytelling Projects"
    ],
    members: 60,
    image: "🎬"
  }
]);

  const [expandedClub, setExpandedClub] = useState(null);

  const toggleClub = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  return (
    <div className="club-activities-container">
      <h2>🏢 Explore Club Activities</h2>
      <p className="intro-text">Discover all the amazing activities and clubs on campus</p>

      <div className="clubs-list">
        {clubs.map(club => (
          <div key={club.id} className="club-card">
            <div 
              className="club-header"
              onClick={() => toggleClub(club.id)}
            >
              <div className="club-title-section">
                <span className="club-icon">{club.image}</span>
                <div>
                  <h3>{club.name}</h3>
                  <p className="club-description">{club.description}</p>
                </div>
              </div>
              <div className="club-toggle">
                <span className="members-badge">👥 {club.members} members</span>
                <span className={`toggle-icon ${expandedClub === club.id ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
            </div>

            {expandedClub === club.id && (
              <div className="club-details">
                <h4>📚 Activities</h4>
                <ul className="activities-list">
                  {club.activities.map((activity, index) => (
                    <li key={index}>
                      <span className="activity-icon">✨</span>
                      {activity}
                    </li>
                  ))}
                </ul>
                <div className="club-actions">
                  <button className="join-btn">Join Club</button>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
