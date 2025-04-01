import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface AlumniInterviewProps {
  name: string;
  categories: string;
  quote: string;
  imageSrc: string;
  storyLink: string;
}

const AlumniInterview: FC<AlumniInterviewProps> = ({
  name,
  categories,
  quote,
  imageSrc,
  storyLink
}) => {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
          Alumni Success Stories
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section - Left Side */}
          <div className="w-full md:w-1/2">
            <div className="relative h-96 md:h-full overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Content Section - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="text-gray-600 uppercase text-sm font-medium tracking-wider mb-2">
              Alumi Interview
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {name}
            </h2>
            
            <div className="text-sm text-gray-600 uppercase tracking-wide mb-6">
              {categories}
            </div>
            
            <blockquote className="text-gray-700 mb-8 italic">
              "{quote}"
            </blockquote>
            
            <Link 
              href={storyLink} 
              className="self-start border border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-50 transition-colors uppercase text-sm tracking-wide"
            >
              See {name.split(' ')[0]}'s Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with the data from the image
export default function AtikuAbubakarInterview() {
  return (
    <AlumniInterview
      name="Atiku Abubakar"
      categories="EDUCATION, BUSINESS & LEADERSHIP"
      quote="My time at ABU was transformative—it gave me the knowledge, confidence, and connections to pursue my dreams. The lessons I learned here extended far beyond the classroom, shaping me into the resilient and driven professional I am today. I'm proud to be an alum and will always carry the values of excellence, innovation, and service forward in my career."
      imageSrc="/atiku.png" // Replace with your actual image path
      storyLink="/alumni/atiku-abubakar"
    />
  );
}

// If you want to create a reusable component for multiple alumni profiles:
/*
export const AlumniInterviewSection = AlumniInterview;

// Then in your page file:
import { AlumniInterviewSection } from '@/components/AlumniInterview';

export default function AlumniPage() {
  return (
    <AlumniInterviewSection 
      name="Atiku Abubakar"
      categories="EDUCATION, BUSINESS & LEADERSHIP"
      quote="My time at ABU was transformative—it gave me the knowledge, confidence, and connections to pursue my dreams. The lessons I learned here extended far beyond the classroom, shaping me into the resilient and driven professional I am today. I'm proud to be an alum and will always carry the values of excellence, innovation, and service forward in my career."
      imageSrc="/images/atiku-abubakar.jpg"
      storyLink="/alumni/atiku-abubakar"
    />
  );
}
*/