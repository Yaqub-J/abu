'use client';


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="relative overflow-hidden rounded-lg h-[300px]">
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-black hover:opacity-40 p-6 flex flex-col text-white">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

interface BlogPostProps {
  title: string;
  link: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, link }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg">
      <p className="mb-4">{title}</p>
      <Link href={link} className="text-green-600 font-medium">
        Read more...
      </Link>
    </div>
  );
};

const AlumniAssociation: React.FC = () => {
  const featureCards = [
    {
      imageSrc: "/Blog1.png",
      title: "Generations strong:",
      description: "This family's shared journey through ABU."
    },
    {
      imageSrc: "/Blog2.png",
      title: "Royal Bonds:",
      description: "Rulers of Zazzau and Kano kingdoms established periods of amicable relations..."
    },
    {
      imageSrc: "/Blog3.png",
      title: "Friendship:",
      description: "From campus connections to lifelong bonds: friendships made at university."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Bonds Between Us <span className="text-gray-500">(ABU)</span></h1>
        <p className="text-gray-600 max-w-3xl">
          Bonds Between Us explores the enduring relationships formed during Alumni institutional years, highlighting their evolution into lifelong bonds and connections.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {featureCards.map((card, index) => (
          <FeatureCard 
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      {/* Upcoming Events Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          In essence, alumni events that make a change are about transforming connections into action. 
          They demonstrate the power of a united alumni community to make a lasting difference in the world
        </p>
      </div>

      {/* Latest Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BlogPost 
          title="Your donations empowers the next generation of Ahmadu Bello University Leaders. Invest in the future, and leave a legacy that transforms lives."
          link="/blog/donations-impact"
        />
        <BlogPost 
          title="Your donations empowers the next generation of Ahmadu Bello University Leaders. Invest in the future, and leave a legacy that transforms lives."
          link="/blog/donations-future"
        />
      </div>
    </div>
  );
};

export default AlumniAssociation;