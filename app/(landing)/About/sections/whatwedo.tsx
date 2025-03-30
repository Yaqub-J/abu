import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  title: string;
  items: string[];
}

interface WhatWeDoSectionProps {
  title?: string;
  services?: ServiceItem[];
  backgroundImageSrc?: string;
}

const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  title = "What we do",
  backgroundImageSrc = "/logo.png",
  services = [
    {
      title: "Networking Opportunities",
      items: [
        "We facilitate professional and social networking events, both online and in-person, to connect alumni across industries and locations.",
        "We organize regional alumni gatherings and industry-specific networking mixers.",
        "We provide access to online platforms for alumni to connect and collaborate."
      ]
    },
    {
      title: "Mentorship Programs",
      items: [
        "Our mentorship program pairs experienced alumni with recent graduates and current students, providing guidance and support.",
        "We offer career mentorship opportunities to help alumni advance in their professional lives.",
        "We facilitate programs that allow alumni to mentor current students."
      ]
    },
    {
      title: "Career Resources",
      items: [
        "We provide access to career resources, including job boards, resume workshops, and career counseling.",
        "We offer webinars and workshops on career advancement, professional development, and industry trends.",
        "Access to job postings from companies that seek out our alumni."
      ]
    },
    {
      title: "Professional Development",
      items: [
        "Access to online learning resources, and continuing education opportunities.",
        "We offer workshops and seminars on relevant professional skills.",
        "Information on any partnerships with professional development platforms."
      ]
    }
  ]
}) => {
  return (
    <div className="relative w-full bg-white py-12 px-4 md:px-8 lg:px-12">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="w-16 h-1 bg-green-600 mb-12"></div>
        
        {/* Background University Emblem/Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 z-0">
          <Image
            src={backgroundImageSrc}
            alt="University emblem"
            width={800}
            height={800}
            className="opacity-20"
          />
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center">
                <div className="text-3xl transform rotate-45">♦</div>
                <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
              </div>
              
              <ul className="list-disc space-y-4 ml-5">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;