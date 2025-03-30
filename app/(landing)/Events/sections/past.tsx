'use client'; 


import React, { useState } from 'react';

interface PastEvent {
  id: string;
  imageUrl: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
  isNew: boolean;
}

const PastEvents: React.FC = () => {
  // Sample data - replace with your actual data source
  const [events, setEvents] = useState<PastEvent[]>([
    {
      id: '1',
      imageUrl: '/images/event-placeholder.jpg', // Replace with your actual image path
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: true,
    },
    {
      id: '2',
      imageUrl: '/images/event-placeholder.jpg',
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: true,
    },
    {
      id: '3',
      imageUrl: '/images/event-placeholder.jpg',
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: true,
    },
    {
      id: '4',
      imageUrl: '/images/event-placeholder.jpg',
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: true,
    },
    {
      id: '5',
      imageUrl: '/images/event-placeholder.jpg',
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: true,
    },
    {
      id: '6',
      imageUrl: '/images/event-placeholder.jpg',
      date: {
        day: 25,
        month: 'MARCH',
        year: 2022,
      },
      isNew: false,
    },
  ]);

  // Filter state
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  
  // Filter function
  const handleFilterToggle = () => {
    setShowOnlyNew(!showOnlyNew);
  };
  
  // Get filtered events
  const filteredEvents = showOnlyNew 
    ? events.filter(event => event.isNew) 
    : events;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Past Events</h1>
      
      {/* Filter Button */}
      <div className="mb-8">
        <button 
          onClick={handleFilterToggle}
          className={`px-8 py-3 rounded-full text-white font-medium ${showOnlyNew ? 'bg-green-700' : 'bg-green-600'}`}
        >
          Filter
        </button>
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-3xl shadow-md overflow-hidden">
            {/* Event Image with New Label */}
            <div className="relative">
              <div className="bg-gray-300 h-48 w-full">
                {/* Replace with actual image */}
                {/* <img 
                  src={event.imageUrl} 
                  alt="Event" 
                  className="w-full h-full object-cover"
                /> */}
              </div>
              
              {/* New Label */}
              {event.isNew && (
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                </div>
              )}
            </div>
            
            {/* Event Date */}
            <div className="p-4">
              <div className="text-gray-700 mt-2">
                <span className="font-medium">{event.date.day}</span>
                {' '}
                <span className="uppercase">{event.date.month}</span>
                {' '}
                <span>{event.date.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;