// PastProjects.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  href: string;
}

interface PastProjectsProps {
  projects: Project[];
}

const PastProjects: React.FC<PastProjectsProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Past Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link href={project.href} key={project.id}>
            <div className="group cursor-pointer">
              <div className="relative h-64 w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-gray-600 mb-2">{project.subtitle}</p>
              <p className="text-gray-500 text-sm">{project.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PastProjects;

