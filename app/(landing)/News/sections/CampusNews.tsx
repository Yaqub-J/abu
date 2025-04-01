import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsItemProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  link?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, subtitle, imageSrc, link }) => (
  <div className="relative overflow-hidden rounded-lg group">
    <div className="relative h-60 w-full">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  </div>
);

interface FeaturedNewsProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  link?: string;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ title, subtitle, description, imageSrc, link }) => (
  <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-md">
    <div className="relative h-122 w-full">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
    <div className="p-4">
      <p className="text-gray-700">{description}</p>
      {link && (
        <Link href={link} className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800">
          Learn More
        </Link>
      )}
    </div>
  </div>
);

const CampusNewsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-gray-300 pb-2">
          <h2 className="text-4xl font-bold text-gray-800">What's New On Campus</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured News Item */}
          <div className="md:col-span-1">
            <FeaturedNews
              title="A New Era of Leadership: Prof. Adamu Ahmad Takes the Helm"
              subtitle=""
              description="We proudly welcome Prof. Adamu Ahmad as our new Vice Chancellor—a brilliant academic and inspiring leader dedicated to excellence, innovation, and the growth of Ahmadu Bello University."
              imageSrc="/profadamu.png"
              link="/news/new-vice-chancellor"
            />
          </div>
          
          {/* Grid of news items */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NewsItem
              title="New Building"
              subtitle="This is the new department of agriculture"
              imageSrc="/building.png"
            />
            <NewsItem
              title="New Theatre"
              subtitle="This is the new theatre for faculty of Arts"
              imageSrc="/theatre.png"
            />
            <NewsItem
              title="Convocation"
              subtitle="Pharmaceutical Convocation"
              imageSrc="/convocation.png"
            />
            <NewsItem
              title="Research"
              subtitle="An Ongoing Pharmacological Research"
              imageSrc="/research.png"
            />
            <NewsItem
            title="Research"
            subtitle="An Ongoing Pharmacological Research"
            imageSrc="/research.png"
            />
            <NewsItem
            title="New Building"
            subtitle="This is the new department of agriculture"
            imageSrc="/building.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusNewsSection;