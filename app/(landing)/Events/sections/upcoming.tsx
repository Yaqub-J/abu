import React from 'react';

interface Event {
  id: string;
  title: string;
  presenter: string;
  venue: string;
  date: {
    day: number;
    month: string;
    weekday: string;
  };
  time: string;
  attending: boolean;
}

const UpcomingEvents: React.FC = () => {
  // Sample data - replace with your actual data source
  const events: Event[] = [
    {
      id: '1',
      title: 'A Nostalgic Academic Session',
      presenter: 'Rtd Professor Aminu Ismail',
      venue: 'Theatre of Arts Ahmadu Bello University Samaru Campus Zaria.',
      date: {
        day: 5,
        month: 'JULY',
        weekday: 'MON',
      },
      time: '10:00 PM',
      attending: true,
    },
    // Add more events as needed
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      
      <div className="space-y-6">
        {/* Repeat the same event card multiple times to match the image */}
        {[...Array(4)].map((_, index) => (
          <div 
            key={`event-${index}`}
            className="bg-white rounded-3xl shadow-md overflow-hidden p-6"
          >
            <div className="flex items-start">
              {/* Date Column */}
              <div className="mr-6 text-center">
                <div className="text-xl font-medium text-gray-600">{events[0].date.weekday}</div>
                <div className="text-6xl font-bold text-green-400">{events[0].date.day}</div>
                <div className="text-xl font-medium text-gray-600">{events[0].date.month}</div>
              </div>
              
              {/* Event Details Column */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">{events[0].title}</h2>
                
                <div className="space-y-3 text-gray-600">
                  {/* Presenter */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span>{events[0].presenter}</span>
                  </div>
                  
                  {/* Venue */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span>{events[0].venue}</span>
                  </div>
                  
                  {/* Time */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <span>{events[0].time}</span>
                  </div>
                </div>
              </div>
              
              {/* Attending Button */}
              <div className="ml-4">
                <button 
                  className="px-4 py-1 text-sm text-green-600 border border-green-600 rounded-full"
                >
                  Attending
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;