'use client';

import DonationForm from '@/app/components/DonationForm';
import Navbar from '../(landing)/Home/landing/Navbar';
import Footer from '../(landing)/Home/landing/Footer';

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Make a Donation</h1>
            <p className="mt-2 text-gray-600">
              Support ABU by making a donation today. Your contribution will help us continue our mission.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DonationForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
