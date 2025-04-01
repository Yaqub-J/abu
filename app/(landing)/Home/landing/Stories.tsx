import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AlumniStoryProps {
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const AlumniStory: React.FC<AlumniStoryProps> = ({ title, name, description, imageUrl, link }) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-lg overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold uppercase mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <Link href={link} className="text-green-600 hover:text-green-800 transition-colors">
        View
      </Link>
    </div>
  );
};

const AlumniSuccessStories: React.FC = () => {
  const alumniStories = [
    {
      title: "Automobile Legacy",
      name: "Zailani Yusuf",
      description: "Zailani Yusuf is the designer behind the groundbreaking Chevrolet Volt...",
      imageUrl: "/Zailani.png",
      link: "/alumni/zailani-yusuf"
    },
    {
      title: "Fintech Legacy",
      name: "Aminu Bakori",
      description: "Aminu Bakori is a software engineer and entrepreneur, serving as the CEO and Founder of Payant and Sudo. At Sudo Africa, he spearheaded the development of programmable cards for developers. With Payant, he is simplifying invoicing and payments for businesses.",
      imageUrl: "/Bakori.png",
      link: "/alumni/aminu-bakori"
    },
    {
      title: "Nations' Legacy",
      name: "Umaru Musa Yar'Adua",
      description: "Umaru Musa Yar'Adua (Nigeria's 13th president, 2007-2010) remembered for strong emphasis on upholding legal processes, Niger delta Amnesty Program...",
      imageUrl: "/Yaradua.png",
      link: "/alumni/umaru-musa-yaradua"
    },
    {
      title: "Technology Legacy",
      name: "Additional Alumni",
      description: "Featuring another successful alumni who has made significant contributions to technology...",
      imageUrl: "/Bakori.png",
      link: "/alumni/tech-legacy"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Background watermark/logo (optional) - this can be customized based on your university logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full border-4 border-gray-200"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6">Alumni Success Stories</h2>
          <p className="text-lg text-gray-700 max-w-4xl">
            Alumni success stories are more than just tales of individual achievement; they serve as a powerful testament to the 
            institution's educational prowess and the latent potential within its graduates.
          </p>
        </div>
        
        {/* Alumni stories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {alumniStories.map((story, index) => (
            <AlumniStory
              key={index}
              title={story.title}
              name={story.name}
              description={story.description}
              imageUrl={story.imageUrl}
              link={story.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniSuccessStories;