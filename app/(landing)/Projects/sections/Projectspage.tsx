// Example usage in a page
// pages/projects.tsx
import React from 'react';
import PastProjects from './PastProjects';

const projects = [
  {
    id: '1',
    title: 'The Legacy Start her',
    subtitle: 'Your donations shows',
    date: '27 MARCH 2024',
    imageUrl: '/project-1.png', // Replace with your actual image paths
    href: '/projects/legacy-1',
  },
  {
    id: '2',
    title: 'The Legacy Start her',
    subtitle: 'Your donations shows',
    date: '4 OCTOBER 2024',
    imageUrl: '/project-2.png',
    href: '/projects/legacy-2',
  },
  {
    id: '3',
    title: 'The Legacy Start her',
    subtitle: 'Your donations shows',
    date: '27 DECEMBER 2024',
    imageUrl: '/project-3.png',
    href: '/projects/legacy-3',
  },
  {
    id: '4',
    title: 'The Legacy Start her',
    subtitle: 'Your donations shows',
    date: '3 APRIL 2023',
    imageUrl: '/project-4.png',
    href: '/projects/legacy-4',
  },
];

const ProjectsPage: React.FC = () => {
  return (
    <main>
      <PastProjects projects={projects} />
    </main>
  );
};

export default ProjectsPage;