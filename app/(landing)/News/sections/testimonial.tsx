import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface TestimonialCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
};

const AlumniTestimonials: FC = () => {
  return (
    <div className="w-full bg-gray-100">
      {/* Hero Section with Hands Image */}
      <div className="relative overflow-hidden bg-gray-100 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/newshero.png" // Replace with your actual image path
            alt="Hands symbolizing bonds"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bonds between us</h1>
          
          <p className="text-lg md:text-xl max-w-3xl">
            The bonds formed at Ahmadu Bello University go far beyond graduation.
            The friendships, mentorships, and shared experiences created here have
            stood the test of time—remaining a cornerstone of my personal and
            professional journey. These relationships are a testament to the enduring
            strength and warmth of the ABU community.
          </p>
          
          <Link href="/alumni-stories" className="inline-flex items-center mt-8 px-6 py-3 bg-white text-gray-900 rounded-md font-medium transition-colors hover:bg-gray-100">
            View <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
      
      {/* Testimonial Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            title="Generations Strong"
            description="A family's shared journey through ABU."
            imageSrc="/Blog1.png" // Replace with actual image path
          />
          
          <TestimonialCard
            title="Royal Bonds"
            description="Rulers of Zazzau and Kano kingdoms established periods of amicable relations."
            imageSrc="/Blog2.png" // Replace with actual image path
          />
          
          <TestimonialCard
            title="Friendship"
            description="Campus connections to lifelong bonds: friendships made at ABU."
            imageSrc="/Blog3.png" // Replace with actual image path
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 max-w-2xl mx-auto">
            Everyone has a story worth telling—whether it's a personal
            journey, an inspiring achievement, a lesson learned, or
            a heartfelt memory. If you (or someone you know) would like
            to be featured on our blog, we'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlumniTestimonials;