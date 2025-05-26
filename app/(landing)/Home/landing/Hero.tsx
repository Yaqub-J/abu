'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Hero Background with Overlay */}
      <div className="relative w-full h-screen max-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 m-4">
          <Image
            src="/hero.png"
            alt="ABU group photo"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Hero Title */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
              Bringing Change<br />Since 1962
            </h1>

            {/* Hero Text */}
            <p className="text-white text-lg md:text-xl mb-8 max-w-3xl">
              For over six decades, ABU has been a catalyst for progress, shaping leaders 
              and driving innovation. Your support empowers us to continue this legacy. 
              Join us as we build a future where ABU's impact resounds for generations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/login" className="inline-block text-center py-3 px-8 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-lg font-medium">
                  Login
              </Link>
              <Link href="/donations" className="inline-block text-center py-3 px-8 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors duration-300 text-lg font-medium">
                  Donate now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="relative mx-4 md:mx-12 lg:mx-20 -mt-24 md:-mt-32 z-20">
        <div className="bg-white rounded-4xl shadow-xl flex flex-col md:flex-row">
          {/* Donations Stat */}
          <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 border-b md:border-b-0 md:border-r border-gray-400">
            <span className="text-green-700 text-5xl md:text-6xl font-bold mb-2">178</span>
            <span className="text-gray-600 text-xl">Donations received</span>
          </div>

          {/* Projects Stat */}
          <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 border-b md:border-b-0 md:border-r border-gray-400">
            <span className="text-green-700 text-5xl md:text-6xl font-bold mb-2">40</span>
            <span className="text-gray-600 text-xl">Supported projects</span>
          </div>

          {/* Alumni Stat */}
          <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12">
            <span className="text-green-700 text-5xl md:text-6xl font-bold mb-2">120K</span>
            <span className="text-gray-600 text-xl">Alumni registered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;