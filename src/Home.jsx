import React, { useEffect, useState } from 'react';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiKey = import.meta.env.VITE_TBA_API_KEY;
        console.log('TBA API Key:', apiKey);

        const response = await fetch('https://www.thebluealliance.com/api/v3/events/2024', {
          headers: {
            'X-TBA-Auth-Key': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched events:', data);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Robotnia</h1>
      <p>This is your FRC match prediction site powered by Blue Alliance data.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">FRC 2024 Events</h2>
        {events.length > 0 ? (
          <ul className="list-disc list-inside">
            {events.slice(0, 10).map((event) => (
              <li key={event.key}>{event.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
