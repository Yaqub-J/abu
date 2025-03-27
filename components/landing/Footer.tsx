'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const AlumniFooter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log('Submitted email:', email);
    // Reset form
    setEmail('');
  };

  return (
    <footer className="w-full text-white">
      {/* Newsletter Section */}
      <div className="relative w-full bg-black">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/footerbg.png" 
            alt="Newsletter background" 
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Stay informed about ABU's progress, and receive exclusive invitations to events and gatherings.</h2>
          <p className="text-gray-300 mb-6">With our daily newsletter</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-2 rounded-md flex-grow bg-amber-50 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="px-6 py-2 bg-zinc-800 hover:bg-zinc-500 rounded-md transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer Links Section */}
      <div className="bg-stone-900 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our social pages</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Facebook size={24} />
              </Link>
            </div>
          </div>
          
          {/* Quick Links 1 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">Who we are</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">Projects</Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">News</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">Career Opportunities</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">Event & Program</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Address : No 5 Zaria Express Way Kaduna State</li>
              <li>Call : +234 80978533</li>
              <li>Email: abuedung@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-stone-900 border-t border-gray-800 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© Copyright Alumni ABU 2025 | All Rights Reserved</p>
          <p>Website by Kad ICT Hub</p>
        </div>
      </div>
    </footer>
  );
};

export default AlumniFooter;