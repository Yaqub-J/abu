
import { useState } from 'react';
import Image from 'next/image';

export default function DonationsPage() {
  const [amount, setAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('general');

  const funds = [
    {
      id: 'general',
      name: 'General Fund',
      description: 'Support overall university development',
      icon: '/general-fund.png'
    },
    {
      id: 'hardship',
      name: 'Student Hardship Fund',
      description: 'Help students in financial need',
      icon: '/hardship-fund.png'
    },
    {
      id: 'research',
      name: 'Research Projects',
      description: 'Support academic research initiatives',
      icon: '/research-projects.png'
    }
  ];

  const handleDonate = async () => {
    try {
      // Initialize HydrogenPay
      const hydrogenPay = new window.HydrogenPay({
        publicKey: process.env.NEXT_PUBLIC_HYDROGEN_PUBLIC_KEY,
        amount: Number(amount) * 100, // Convert to kobo
        email: "donor@example.com", // Replace with actual donor email
        firstname: "Donor",
        lastname: "Name",
        metadata: {
          fund_type: selectedFund
        },
        onClose: () => {
          console.log("Payment window closed");
        },
        onSuccess: (ref: string) => {
          console.log("Payment successful", ref);
          // Handle successful payment
        },
        onError: (error: Error) => {
          console.error("Payment error", error);
          // Handle payment error
        }
      });

      hydrogenPay.openIframe();
    } catch (error) {
      console.error('Payment initialization failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Make a Donation</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select a Fund</h2>
          <div className="space-y-4">
            {funds.map((fund) => (
              <div
                key={fund.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedFund === fund.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedFund(fund.id)}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={fund.icon}
                    alt={fund.name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-medium">{fund.name}</h3>
                    <p className="text-sm text-gray-500">{fund.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Donation Amount</h2>
          <div className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border rounded"
              min="1"
            />
            <button
              onClick={handleDonate}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
