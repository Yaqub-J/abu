import React from 'react';
import Image from 'next/image';

interface AlumniSectionProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const AlumniSection: React.FC<AlumniSectionProps> = ({
  title = "Who we are",
  description = "More than just graduates, we are a family. The Ahmad Bello University Alumni Association is the heart of our community, connecting alumni across generations and geographic boundaries. We believe in the power of shared experiences and the importance of lifelong relationships. We are here to support your personal and professional growth, celebrate your achievements, and provide a lasting connection to the institution you call home.",
  imageSrc = "/graduate.png",
  imageAlt = "Graduate in cap and gown"
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-stone-700 rounded-lg my-2 shadow-lg">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-stone-800 opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:py-20 md:px-12 lg:px-16 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        
        <div className="w-16 h-1 bg-emerald-600 mb-8"></div>
        
        <p className="text-white text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AlumniSection;