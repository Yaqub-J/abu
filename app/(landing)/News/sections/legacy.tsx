'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';

interface LegacyCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  isHighlighted?: boolean;
}

// Individual Legacy Card Component
const LegacyCard: FC<LegacyCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  link, 
  isHighlighted = false 
}) => {
  return (
    <div className={`relative rounded-lg overflow-hidden transition-all duration-300 h-full ${
      isHighlighted ? 'bg-green-100 p-4 scale-105 shadow-lg' : 'bg-white p-4'
    }`}>
      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-4">
        {description}
      </p>
      
      <Link 
        href={link} 
        className="text-green-600 hover:text-green-700 text-sm font-medium"
      >
        learn More
      </Link>
    </div>
  );
};

// Dot Indicators Component
const SliderDots: FC<{ 
  total: number; 
  active: number; 
  onClick: (index: number) => void 
}> = ({ total, active, onClick }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${
            active === index ? 'bg-green-500' : 'bg-gray-200'
          }`}
          onClick={() => onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Main Legacy Slider Component
interface AlumniLegacySliderProps {
  legacies: LegacyCardProps[];
}

const AlumniLegacySlider: FC<AlumniLegacySliderProps> = ({ legacies }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with second item highlighted
  
  // Auto rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % legacies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [legacies.length]);
  
  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {legacies.map((legacy, index) => {
            // Calculate visible items based on current active index
            const visibleIndexes = [];
            for (let i = 0; i < 4; i++) {
              visibleIndexes.push((activeIndex + i) % legacies.length);
            }
            
            // Check if this item should be visible
            if (!visibleIndexes.includes(index)) {
              return null;
            }
            
            return (
              <LegacyCard
                key={index}
                {...legacy}
                isHighlighted={activeIndex === index}
              />
            );
          })}
        </div>
        
        <SliderDots
          total={legacies.length}
          active={activeIndex}
          onClick={setActiveIndex}
        />
      </div>
    </div>
  );
};

// Example data based on the screenshot
const legacyExamples = [
  {
    title: "AUTOMOBILE LEGACY",
    description: "Zailani Yusuf is the designer behind the groundbreaking Chevrolet Volt...",
    imageSrc: "/Zailani.png",
    link: "/legacy/automobile"
  },
  {
    title: "FINTECH LEGACY",
    description: "Aminu Bakori is a software engineer and entrepreneur, serving as the CEO and Founder of Payant and Sudo. At Sudo Africa, he spearheaded the development of programmable cards for developers. With Payant, he is simplifying invoicing and payments for businesses.",
    imageSrc: "/Bakori.png",
    link: "/legacy/fintech"
  },
  {
    title: "NATIONS' LEGACY",
    description: "Umaru Musa Yar'Adua (Nigeria's 13th president, 2007-2010) remembered for strong emphasis on upholding legal processes, Niger delta Amnesty Program...",
    imageSrc: "/Yaradua.png",
    link: "/legacy/nations"
  },
  {
    title: "EMIR'S LEGACY",
    description: "Umaru Musa Yar'Adua (Nigeria's 13th president, 2007-2010) remembered for strong emphasis on upholding legal processes, Niger delta Amnesty Program...",
    imageSrc: "/Emir.png",
    link: "/legacy/emir"
  },
  // Add more legacy items as needed
];

// Default export with example data
export default function LegacySlider() {
  return <AlumniLegacySlider legacies={legacyExamples} />;
}

// Export the component for reuse with custom data
export { AlumniLegacySlider };