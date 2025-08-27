import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Event Schedule</h1>
      <ul className="list-group">
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

          return (
            <li key={index} className={`list-group-item ${item.isBreak ? 'list-group-item-secondary' : ''}`}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{item.title}</h5>
                <small>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
              {!item.isBreak &&
                <div>
                  <p className="mb-1">{item.description}</p>
                  <small><strong>Speakers:</strong> {item.speakers.join(', ')}</small><br />
                  <small><strong>Category:</strong> {item.category.join(', ')}</small>
                </div>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;