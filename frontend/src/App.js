import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const categoryIcons = {
  "AI": "fa-solid fa-robot",
  "Machine Learning": "fa-solid fa-brain",
  "Web Development": "fa-solid fa-code",
  "Scalability": "fa-solid fa-server",
  "Cybersecurity": "fa-solid fa-shield-halved",
  "Quantum Computing": "fa-solid fa-atom",
  "Physics": "fa-solid fa-flask",
  "Data Science": "fa-solid fa-database",
  "Social Impact": "fa-solid fa-hand-holding-heart",
  "Serverless": "fa-solid fa-cloud",
  "Cloud Computing": "fa-solid fa-cloud-upload-alt"
};

function App() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/schedule')
      .then(response => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
      });
  }, []);

  const scheduleWithBreaks = [];
  let talkCount = 0;
  for (let i = 0; i < schedule.length; i++) {
    scheduleWithBreaks.push(schedule[i]);
    talkCount++;
    if (talkCount === 3) {
      scheduleWithBreaks.push({ title: 'Lunch Break', duration: '1 hour', isBreak: true });
    } else if (i < schedule.length - 1) {
      scheduleWithBreaks.push({ title: 'Break', duration: '10 minutes', isBreak: true });
    }
  }

  let currentTime = new Date('2025-01-01T10:00:00');

  return (
    <div>
      <div className="header">
        <div className="logo">EventName</div>
      </div>
      <div className="container">
        {scheduleWithBreaks.map((item, index) => {
          const startTime = new Date(currentTime);
          const durationParts = item.duration.split(' ');
          const durationValue = parseInt(durationParts[0]);
          const durationUnit = durationParts[1];

          if (durationUnit.startsWith('hour')) {
            currentTime.setHours(currentTime.getHours() + durationValue);
          } else if (durationUnit.startsWith('minute')) {
            currentTime.setMinutes(currentTime.getMinutes() + durationValue);
          }
          const endTime = new Date(currentTime);

          if (item.isBreak) {
            return (
              <div key={index} className="card break-card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h6>
                </div>
              </div>
            )
          }

          return (
            <div key={index} className="card">
              <div className="card-header">
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.speakers.join(', ')}</h6>
                <p className="card-text">{item.description}</p>
                <div>
                  {item.category.map(cat => (
                    <span key={cat} className="badge bg-primary me-2">
                      <i className={`${categoryIcons[cat]} category-icon`}></i>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
