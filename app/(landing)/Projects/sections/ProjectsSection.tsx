import React from 'react';
import Image from 'next/image';

const ProjectsSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-8 border-b-4 border-green-500 pb-2 inline-block">
              Projects
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              At ABU, we're proud to celebrate the incredible contributions of
              our alumni and the transformative projects they've spearheaded.
              From groundbreaking initiatives to community-driven efforts,
              their work continues to inspire and create lasting change. Explore
              our completed projects below, and learn how you can support
              our ongoing efforts to make an even greater impact. Together, we
              can build a brighter future!
            </p>
          </div>

          {/* Images with Bubble Design */}
          <div className="w-full lg:w-1/2 relative h-96">
            {/* Classroom image */}
            <div className="absolute right-0 top-0 bg-green-100 rounded-full p-2 h-40 w-40 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src="/images/classroom.jpg" 
                  alt="Classroom"
                  fill
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Auditorium image */}
            <div className="absolute left-0 top-1/4 bg-green-100 rounded-full p-2 h-52 w-52 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src="/images/auditorium.jpg" 
                  alt="Auditorium"
                  fill
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Library image */}
            <div className="absolute right-8 bottom-0 bg-green-100 rounded-full p-2 h-44 w-44 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src="/images/library.jpg" 
                  alt="Library"
                  fill
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M250 60 L150 150 L250 300" stroke="#D1E9D8" strokeWidth="30" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;