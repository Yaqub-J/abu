import React from 'react';
import NewsCard from './NewsCard';

// Sample data for news cards
const newsItems = [
  {
    id: 1,
    title: "A Glimpse into the Future: Exploring the New Research Laboratories at Samaru ABU Branch",
    description: "Nestled within the vibrant academic hub of Ahmadu Bello University's Samaru campus, the newly unveiled state-of-the-art research laboratories stand as a beacon of innovation and scientific progress.",
    imageUrl: "/newscard1.png",
    date: "7 March 2025",
    videoEnabled: true,
    url: "/news/new-research-laboratories"
  },
  {
    id: 2,
    title: "Breaking Barriers: How Our Team Cracked the Equation That Changes Everything",
    description: "Nestled within the vibrant academic hub of Ahmadu Bello University's Samaru campus, the newly unveiled state-of-the-art research laboratories stand as a beacon of innovation and scientific progress. Through relentless collaboration and brilliance, our team has conquered one of mathematics' greatest challenges.",
    highlight: "The Nature of Quantum Jumps: Are They Fundamental or an Emergent Phenomenon?",
    imageUrl: "/newscard2.png",
    date: "10 March 2025",
    videoEnabled: true,
    url: "/news/quantum-breakthrough"
  }
];

const NewsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest News & Research</h1>
      
      <div className="space-y-8">
        {newsItems.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            date={item.date}
            highlight={item.highlight}
            videoEnabled={item.videoEnabled}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;