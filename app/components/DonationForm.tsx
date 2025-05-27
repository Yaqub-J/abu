'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HydrogenPayButton from './HydrogenPayButton';

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation only
    if (!amount || !name || !email) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }
  };
  
  const handlePaymentSuccess = (data: any) => {
    setMessage('Thank you for your donation!');
    setMessageType('success');
    console.log('Payment successful:', data);
    // You could redirect to a thank you page here
    // router.push('/donation/thank-you');
  };

  const handlePaymentError = (error: any) => {
    setMessage(`Payment failed: ${error.message || 'Unknown error'}`);
    setMessageType('error');
    console.error('Payment error:', error);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      {message && (
        <div 
          className={`p-4 mb-4 rounded ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Donation Amount (₦)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="100"
            step="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center space-x-3">
            <input
              id="donation-type-one-time"
              name="donation-type"
              type="radio"
              checked={!isRecurring}
              onChange={() => setIsRecurring(false)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <label htmlFor="donation-type-one-time" className="block text-sm font-medium text-gray-700">
              One-time Donation
            </label>
          </div>
          
          <div className="flex items-center space-x-3 mt-2">
            <input
              id="donation-type-monthly"
              name="donation-type"
              type="radio"
              checked={isRecurring}
              onChange={() => setIsRecurring(true)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <label htmlFor="donation-type-monthly" className="block text-sm font-medium text-gray-700">
              Monthly Recurring Donation
            </label>
          </div>
          
          {isRecurring && (
            <div className="ml-7 mt-2 text-sm text-gray-500">
              Your card will be charged this amount every month until you cancel.
            </div>
          )}
        </div>
        
        <HydrogenPayButton
          amount={parseFloat(amount) || 0}
          customerName={name}
          email={email}
          currency="NGN"
          description={isRecurring ? "Monthly Donation to ABU" : "One-time Donation to ABU"}
          meta={isRecurring ? "donation_type=monthly" : "donation_type=one-time"}
          frequency="monthly"
          isRecurring={isRecurring}
          buttonText={isRecurring ? "Start Monthly Donation" : "Donate Now"}
          buttonClassName="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </form>
    </div>
  );
}
