import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SupportingPrioritiesProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  images?: {
    src: string;
    alt: string;
  }[];
}

const SupportingPriorities: React.FC<SupportingPrioritiesProps> = ({
  title = "Supporting Priorities & Removing Barriers That Stand In The Way",
  description = "Our online alumni directory allows you to reconnect with classmates build valuable professional relationships & give back to the institution.",
  buttonText = "Donate now",
  buttonLink = "/donate",
  images = [
    { src: "/graduate-1.png", alt: "Female graduate in green cap" },
    { src: "/graduate-2.png", alt: "Female graduate in white dress" },
    { src: "/graduate-3.png", alt: "Male graduate in suit" },
    { src: "/graduate-4.png", alt: "Female graduate in green gown" }
  ]
}) => {
  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Gallery with Decorative Elements */}
          <div className="w-full lg:w-1/2 relative">
            {/* Background shapes */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-green-200 rounded-tl-3xl rounded-br-3xl z-0"></div>
            
            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {/* Top left image */}
              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl h-48 md:h-64">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tl-3xl rounded-br-3xl"
                />
              </div>
              
              {/* Top right image */}
              <div className="relative overflow-hidden rounded-tr-3xl rounded-bl-3xl h-48 md:h-64">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tr-3xl rounded-bl-3xl"
                />
              </div>
              
              {/* Bottom left image */}
              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl h-48 md:h-64">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tl-3xl rounded-br-3xl"
                />
              </div>
              
              {/* Bottom right image with green accent */}
              <div className="relative overflow-hidden rounded-tr-3xl rounded-bl-3xl h-48 md:h-64">
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-200 rounded-full z-0"></div>
                <Image
                  src={images[3].src}
                  alt={images[3].alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tr-3xl rounded-bl-3xl relative z-10"
                />
              </div>
            </div>
            
            {/* Diamond decorative elements */}
            <div className="absolute -bottom-10 -left-10 text-green-200 z-20">
              <div className="relative">
                <div className="text-6xl transform rotate-45">♦</div>
                <div className="absolute top-12 left-12 text-4xl transform rotate-45">♦</div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-700">
              {description}
            </p>
            <div>
              <Link href={buttonLink}>
                <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportingPriorities;