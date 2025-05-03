'use client';


import React from 'react';
import Image from 'next/image';

interface InitiativeCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg">
      {imageUrl && (
        <div className="w-full h-40 mb-4 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface SupportPriorityProps {
  title: string;
  description: string;
}

const SupportPriority: React.FC<SupportPriorityProps> = ({ title, description }) => {
  return (
    <div className="border-t border-gray-200 py-8">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Initiatives: React.FC = () => {
  const initiatives = [
    {
      title: "Green Campus Initiative",
      description: "Projects focused on sustainable building practices, renewable energy",
      imageUrl: "/greenhouse.png" // Replace with your actual image path
    },
    {
      title: "Innovation Hubs",
      description: "State-of-the-art makerspaces, fabrication labs, and technology centers for hands-on learning.",
      imageUrl: "/innovationhub.png" // Replace with your actual image path
    },
    {
      title: "Digital Campus",
      description: "High-speed Wi-Fi, robust digital infrastructure, and immersive virtual learning environments.",
      imageUrl: "/images/digital-campus.jpg" // Replace with your actual image path
    },
    {
      title: "The Legacy Fund",
      description: "Your donations generate scholarships for future generations of University students.",
      imageUrl: "/images/legacy-fund.jpg" // Replace with your actual image path
    }
  ];

  const priorities = [
    {
      title: "Hardship Fund",
      description: "The Hardship Fund, fueled by alumni donations, helps students overcome unexpected financial obstacles, allowing them to continue their education."
    },
    {
      title: "Projects and Research",
      description: "Alumni funding drives cutting-edge research and projects, enabling faculty and students to advance knowledge and tackle global issues."
    },
    {
      title: "Our Community",
      description: "Alumni support strengthens the community through volunteer work, partnerships, and donations, improving local lives and boosting regional prosperity."
    },
    {
      title: "Institution Development",
      description: "Alumni funding upgrades the institution's facilities, technology, and programs, including learning spaces and faculty development."
    },
    {
      title: "General Fund",
      description: "The General Fund, through unrestricted alumni gifts, gives the university's leadership flexibility to address urgent needs and pursue new opportunities, ensuring long-term stability."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">See Your Support in Action</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the initiatives where your donations are making a real and visible difference at ABU.
        </p>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {initiatives.map((initiative, index) => (
          <InitiativeCard
            key={index}
            title={initiative.title}
            description={initiative.description}
            imageUrl={initiative.imageUrl}
          />
        ))}
      </div>

      {/* Supporting Priorities Section */}
      <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg overflow-hidden mb-16">
        <div className="lg:w-1/2 bg-green-700 opacity-50 p-12 text-white">
          <h2 className="text-3xl text-c font-bold mb-6">Supporting Priorities</h2>
          <p className="text-xl">
            Our alumni play a vital role in advancing Ahmadu Bello University mission and ensuring its continued excellence. We are immensely grateful for their generous support across a range of key priorities:
          </p>
        </div>
        <div className="lg:w-1/2">
          <div className="h-full relative">
            <Image
              src="/priorities.png" // Replace with your actual image
              alt="Graduate celebrating"
              width={600}
              height={400}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Priorities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {priorities.map((priority, index) => (
          <div key={index} className={index === priorities.length - 1 ? "bg-gray-900 text-white p-6 rounded-lg flex items-center justify-center" : ""}>
            {index === priorities.length - 1 ? (
              <h3 className="text-2xl font-bold">Removing Barriers That Stand In The Way</h3>
            ) : (
              <SupportPriority
                title={priority.title}
                description={priority.description}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiatives;