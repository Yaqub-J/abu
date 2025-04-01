import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  highlight?: string;
  videoEnabled?: boolean;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  date,
  highlight,
  videoEnabled = false,
  url,
}) => {
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            
            {highlight && (
              <div className="mb-4">
                <span className="font-medium">{highlight}</span>
              </div>
            )}
            
            <Link href={url} className="inline-block text-sm text-green-600 hover:text-green-700 mt-2">
              See More
              <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="relative h-64 w-full">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
            />
            {videoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-75 rounded-full p-2">
                  <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;