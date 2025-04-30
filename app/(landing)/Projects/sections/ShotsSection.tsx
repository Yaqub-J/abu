"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Shot {
  id: number;
  title: string;
  image: string;
  date: string;
}

const ShotsSection = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  
  const shots: Shot[] = [
    {
      id: 0,
      title: 'Runga Lab launch',
      image: '/images/lab.jpg',
      date: '28 MARCH 2025',
    },
    {
      id: 1,
      title: 'Auditorium launch',
      image: '/images/auditorium.jpg',
      date: '28 MARCH 2025',
    },
    {
      id: 2,
      title: 'Lecture theatre launch',
      image: '/images/lecture.jpg',
      date: '28 MARCH 2025',
    },
    {
      id: 3,
      title: 'Study Space',
      image: '/images/study.jpg',
      date: '28 MARCH 2025',
    },
  ];

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-16">Shots</h2>
        
        <div className="relative h-[500px] md:h-[400px] w-full flex justify-center items-center">
          {shots.map((shot, index) => (
            <div 
              key={shot.id}
              className={`absolute transition-all duration-500 w-full md:w-4/5 lg:w-3/5 max-w-lg rounded-lg overflow-hidden
          ${index === activeSlide ? 'z-30 transform scale-100 opacity-100 translate-x-0' : 
            index < activeSlide ? 'z-20 transform scale-90 opacity-90 -translate-x-full' : 
            'z-10 transform scale-90 opacity-90 translate-x-full'}`}
              style={{
          backgroundColor: '#a5d6a7',
          padding: '1rem',
              }}
            >
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src={shot.image} 
                    alt={shot.title}
                    fill
                    objectFit="cover"
                    className="rounded-full"
                  />
                  {/* Play button overlay */}
                  <div className="absolute bg-white bg-opacity-70 rounded-full h-12 w-12 flex items-center justify-center">
                    <div className="border-t-8 border-b-8 border-b-transparent border-t-transparent border-l-8 border-l-green-600 ml-1"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{shot.title}</h3>
                <p className="text-white text-sm mb-2">Learn More...</p>
                <p className="text-white text-xs">{shot.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {shots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-4 w-4 rounded-full ${activeSlide === index ? 'bg-green-600' : 'bg-green-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl my-16 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-8">
          "Philanthropy is the golden thread linking our greatest achievements."
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-800 mb-6">
          You can donate today - online, by phone or by post.
        </p>
        
        <p className="text-xl md:text-2xl text-green-600 italic">
          Legacy gifts are also a vital way to secure our future.
        </p>
      </div>
    </div>
  );
};

export default ShotsSection;