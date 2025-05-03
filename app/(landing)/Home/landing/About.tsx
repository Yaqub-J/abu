'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link href="#" className="text-green-600 hover:text-green-800 font-medium">
        Learn More
      </Link>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Who We Are Section */}
      <div className="flex flex-col md:flex-row gap-10 mb-20">
        {/* Image Pillars */}
        <div className="flex md:w-1/2">
          <Image 
              src="/about.png" 
              alt="Ahmadu Bello University" 
              width={200} 
              height={600} 
              className="h-100 w-100" 
            />
        </div>
        
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed font-['DM_Sans'] text-[24px]">
            More than just graduates, we are a family. The Ahmadu Bello University Alumni Association is the heart of our community, connecting alumni across generations and geographic boundaries. We believe in the power of shared experiences and the importance of lifelong relationships. We are here to support your personal and professional growth, celebrate your achievements, and provide a lasting connection to the institution you call home.
            </p>
        </div>
      </div>
      
      {/* What We Do Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10">What we do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="shadow-lg rounded-lg p-6 border border-white">
            <ServiceCard 
              title="Networking Opportunities" 
              description="Our online alumni directory allows you to reconnect with classmates and build valuable professional relationships."
            />
          </div>
          
          <div className="shadow-lg rounded-lg p-6 border border-white">
            <ServiceCard 
              title="Volunteer Opportunities" 
              description="We offer opportunities for alumni to volunteer their time and expertise to support the institution and its students."
            />
          </div>
          
          <div className="shadow-lg rounded-lg p-6 border border-white">
            <ServiceCard 
              title="Philanthropy and Giving Back" 
              description="We provide opportunities for alumni to support the institution through donations and fundraising initiatives."
            />
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold italic mb-10">
          "Your Support Can Change Lives. Join Us Today."
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Text Content */}
          <div className="md:w-1/2 my-20">
            <p className="text-gray-700 leading-relaxed text-[20px] mb-8">
              Your donations empower the next generation of Ahmadu Bello University Leaders. Every Naira you give directly supports ABU's students, research, and community initiatives. Invest in the future, and leave a legacy that transforms lives.
            </p>
            
            <Link href="/donate" className="inline-block bg-zinc-800 text-white py-3 px-8 rounded-full hover:bg-zinc-700 transition duration-300">
                Donate now
            </Link>
          </div>
          
          {/* Image Grid */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl">
              <Image 
                src="/Grid1.png" 
                alt="Impact story" 
                width={300} 
                height={300} 
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image 
                src="/Grid2.png" 
                alt="Impact story" 
                width={300} 
                height={300} 
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image 
                src="/Grid3.png" 
                alt="Impact story" 
                width={300} 
                height={300} 
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image 
                src="/Grid4.png" 
                alt="Impact story" 
                width={300} 
                height={300} 
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;