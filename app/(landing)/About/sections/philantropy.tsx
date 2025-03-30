import React from 'react';
import Image from 'next/image';

interface FundingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FundingCard: React.FC<FundingCardProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:shadow-lg">
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
          width={400}
          height={300}
          priority
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const PhilanthropySection: React.FC = () => {
  const fundingOptions = [
    {
      title: "Hardship Fund",
      description: "Alumni generosity provides a critical safety net for students facing unexpected financial challenges. This fund ensures that talented individuals can continue their education, even when confronted with unforeseen difficulties.",
      imageSrc: "/hardship-fund.png",
      imageAlt: "Student studying with laptop"
    },
    {
      title: "Projects & Research",
      description: "Alumni investments fuel groundbreaking research and innovative projects across all disciplines. Your support empowers our faculty and students to push the boundaries of knowledge and address critical global challenges.",
      imageSrc: "/research-projects.png",
      imageAlt: "Research in laboratory"
    },
    {
      title: "Institution Development",
      description: "Alumni contributions directly support the development of our institution's infrastructure, facilities, and academic programs. This includes funding for state-of-the-art learning spaces, cutting-edge technology, and faculty development initiatives.",
      imageSrc: "/institution-development.png",
      imageAlt: "Auditorium with red seats"
    },
    {
      title: "General Fund",
      description: "Unrestricted gifts to the General Fund provide the university's leadership, particularly the VC, with the flexibility to address pressing needs and seize emerging opportunities. This crucial support allows us to respond swiftly to evolving priorities and ensure the institution's long-term sustainability.",
      imageSrc: "/general-fund.png",
      imageAlt: "University building"
    },
    {
      title: "Our Community",
      description: "Our alumni are committed to strengthening the bonds between the institution and the surrounding community. Through volunteerism, partnerships, and financial support, they contribute to initiatives that improve the lives of local residents and enhance the region's prosperity",
      imageSrc: "/our-community.png",
      imageAlt: "Graduation caps"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Philanthropy and Giving Back</h2>
          <p className="text-gray-600 max-w-3xl">
            We provide opportunities for alumni to support the institution through donations and fundraising initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundingOptions.slice(0, 3).map((option, index) => (
            <FundingCard
              key={index}
              title={option.title}
              description={option.description}
              imageSrc={option.imageSrc}
              imageAlt={option.imageAlt}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {fundingOptions.slice(3).map((option, index) => (
            <FundingCard
              key={index + 3}
              title={option.title}
              description={option.description}
              imageSrc={option.imageSrc}
              imageAlt={option.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilanthropySection;