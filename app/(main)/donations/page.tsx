'use client';

import DonationForm from '@/app/components/DonationForm';

export default function DonationsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Support Our Cause</h1>
      <div className="max-w-2xl mx-auto">
        <DonationForm />
      </div>
    </div>
  );
}