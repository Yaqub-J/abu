import React from 'react';

interface UserDetailsStepProps {
  donationData: {
    amount: string;
    currency: string;
    frequency: string;
    agreeToTerms: boolean;
  };
  updateDonationData: (data: Partial<typeof donationData>) => void;
  nextStep: () => void;
}

export default function UserDetailsStep({ 
  donationData, 
  updateDonationData, 
  nextStep 
}: UserDetailsStepProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center space-x-8 mb-8">
        <div className="flex items-center">
          <input
            type="radio"
            id="one-off"
            name="frequency"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            checked={donationData.frequency === 'one-off'}
            onChange={() => updateDonationData({ frequency: 'one-off' })}
          />
          <label htmlFor="one-off" className="ml-2 block text-sm text-gray-700">
            One-Off
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="monthly"
            name="frequency"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            checked={donationData.frequency === 'monthly'}
            onChange={() => updateDonationData({ frequency: 'monthly' })}
          />
          <label htmlFor="monthly" className="ml-2 block text-sm text-gray-700">
            Monthly
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">N</span>
            </div>
            <input
              type="text"
              name="amount"
              id="amount"
              className="focus:ring-green-500 focus:border-green-500 block w-full pl-8 pr-20 py-3 sm:text-lg border-gray-300 rounded-md"
              placeholder="500,000"
              value={donationData.amount}
              onChange={(e) => updateDonationData({ amount: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                id="currency"
                name="currency"
                className="focus:ring-green-500 focus:border-green-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                value={donationData.currency}
                onChange={(e) => updateDonationData({ currency: e.target.value })}
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={donationData.agreeToTerms}
              onChange={(e) => updateDonationData({ agreeToTerms: e.target.checked })}
              required
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="agree-terms-2"
              name="agree-terms-2"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms-2" className="ml-2 block text-sm text-gray-700">
              Do you agree to the terms and conditions
            </label>
          </div>
        </div>

        <div className="mb-6">
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            See terms and conditions
          </a>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Proceed to checkout
          </button>
        </div>
      </form>
    </div>
  );
}
