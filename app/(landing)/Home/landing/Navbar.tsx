'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Event & Program', href: '/Events' },
    { label: 'About Us', href: '/About' },
    { label: 'News', href: '/News' },
    { label: 'Projects', href: '/Projects' },
    { label: 'Career Opportunities', href: '/Careers' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Top Bar */}
      <div className="bg-zinc-700 text-white py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div>Email address: <a href="mailto:alumniabu@gmail.com" className="hover:underline mx-2">alumniabu@gmail.com</a></div>
          <div>Contact no: <a href="tel:09176899999965" className="hover:underline">09176899999965</a></div>
          <div className="ml-auto">
            <Link href="/signup">
              <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors">
              Login/signup
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-zinc-800 text-white py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(0, 3).map((item) => (
              <Link href={item.href} key={item.label}>
                <span className="hover:text-green-400 transition-colors cursor-pointer">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <div className="h-20 w-20 relative cursor-pointer">
                <Image
                  src="/logo.png" 
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (right side) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(3).map((item) => (
              <Link href={item.href} key={item.label}>
                <span className="hover:text-green-400 transition-colors cursor-pointer">{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Empty div to maintain flex spacing on mobile */}
          <div className="md:hidden"></div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label}>
                <div className="block py-2 hover:bg-zinc-700 px-4" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;