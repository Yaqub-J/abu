'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  
  useEffect(() => {
    // Get transaction reference from URL if available
    const transactionRef = searchParams.get('transactionRef');
    
    if (transactionRef) {
      setTransactionDetails({
        transactionRef,
        status: searchParams.get('status') || 'successful',
        amount: searchParams.get('amount') || '',
        currency: searchParams.get('currency') || 'NGN',
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Donation!</h1>
          
          <p className="text-gray-600 mb-8">
            Your generosity helps us continue our mission and make a positive impact in our community.
          </p>
          
          {transactionDetails && (
            <div className="mb-8 bg-gray-50 p-4 rounded-md inline-block">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Transaction Details</h2>
              <div className="text-sm text-gray-600 text-left">
                <p><span className="font-medium">Reference:</span> {transactionDetails.transactionRef}</p>
                {transactionDetails.amount && (
                  <p><span className="font-medium">Amount:</span> {transactionDetails.currency} {transactionDetails.amount}</p>
                )}
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Successful</span></p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Return Home
            </Link>
            <Link 
              href="/donations"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Make Another Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
