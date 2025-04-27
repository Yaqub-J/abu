import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PublicServiceCareers: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-white py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4">
              Welcome to Your Gateway to Public Service Careers!
            </h1>
            <div className="flex items-center mb-8">
              <p className="text-green-500 font-medium text-xl md:text-2xl">"Build a Career That Matters"</p>
              <p className="text-gray-600 italic ml-2 text-xl">Check Out Latest Government Job Openings!</p>
            </div>
          </div>
          <div className="lg:w-2/5 mt-8 lg:mt-0 relative">
            <div className="bg-green-200 rounded-full w-64 h-64 md:w-80 md:h-80 relative mx-auto">
              <div className="absolute -bottom-4 -left-4 transform rotate-45 bg-green-200 w-12 h-12"></div>
              <div className="absolute -top-4 -right-4 transform rotate-45 bg-green-200 w-20 h-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunity Section */}
      <section className="bg-green-100 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-3/5 pr-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 pb-2 border-b-2 border-green-300 inline-block mb-6">
                Career Opportunity
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Are you ready to make a difference and contribute to your nation's growth? Government agencies and
                parastatals are constantly looking for talented individuals like you to join their teams. Whether you're
                a student, recent graduate, or experienced professional, this is your chance to explore exciting
                career opportunities in public service. Browse the latest job openings below and take the first step
                toward a fulfilling career!
              </p>
            </div>
            <div className="lg:w-2/5">
              <div className="relative overflow-hidden">
                <Image 
                  src="/handshake.png" 
                  alt="Professional handshake" 
                  width={500} 
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicServiceCareers;