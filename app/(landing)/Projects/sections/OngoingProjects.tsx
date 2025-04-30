import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reversed = false
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full my-4 bg-green-50 rounded-lg overflow-hidden">
      <div className={`w-full md:w-1/2 ${reversed ? 'md:order-2' : 'md:order-1'}`}>
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <div className={`absolute inset-0 ${reversed ? 'rounded-l-full' : 'rounded-r-full'}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
      <div className={`w-full md:w-1/2 p-8 ${reversed ? 'md:order-1' : 'md:order-2'}`}>
        <h2 className="text-3xl font-bold text-green-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-600 mb-6">Its and ongoing project that started at the early days of January 2025.</p>
        <Link href="/donate">
          <button className="bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Donate now
          </button>
        </Link>
      </div>
    </div>
  );
};

interface OngoingProjectsProps {
  viewMoreUrl?: string;
}

const OngoingProjects: React.FC<OngoingProjectsProps> = ({ viewMoreUrl = "/projects" }) => {
  const projects = [
    {
      title: "The Legacy Starts here",
      description: "Computer labs",
      imageSrc: "/computer-lab.png",
      imageAlt: "Computer labs with multiple monitors",
      reversed: false
    },
    {
      title: "The Legacy Starts here",
      description: "New Girls Hostel",
      imageSrc: "/hostel-construction.png",
      imageAlt: "Construction of a new girls hostel building",
      reversed: true
    },
    {
      title: "The Legacy Starts here",
      description: "The Library",
      imageSrc: "/library.png",
      imageAlt: "Books on library shelves",
      reversed: false
    }
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Ongoing Projects</h1>
        <Link href={viewMoreUrl} className="text-green-600 hover:text-green-700 font-medium">
          View More »
        </Link>
      </div>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            reversed={project.reversed}
          />
        ))}
      </div>
    </section>
  );
};

export default OngoingProjects;