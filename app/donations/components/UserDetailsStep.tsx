import { FormEvent } from 'react';

interface DonationData {
  amount: string;
  email: string;
  customerName: string;
  currency: string;
  frequency: string;
  agreeToTerms: boolean;
}

interface UserDetailsStepProps {
  donationData: DonationData;
  updateDonationData: (data: Partial<DonationData>) => void;
  nextStep: () => void;
  selectedCurrency: string;
  updateSelectedCurrency: (data: string) => void;
}

export default function UserDetailsStep({ 
    donationData, 
    updateDonationData, 
    nextStep,
    selectedCurrency,
    updateSelectedCurrency,
  }: UserDetailsStepProps) {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center space-x-8 mb-8">
        <div className="flex items-center">
          <input
            type="radio"
            id="single"
            name="frequency"
            value="single"
            className="w-4 h-4 rounded-full border-1 appearance-none border-gray-500 hover:border-gray-600 active:border-gray-400
              checked:bg-green-500 checked:border-3 checked:border-white checked:ring-1 checked:ring-green-500
              hover:checked:border-white hover:checked:ring-green-600 hover:checked:bg-green-600 active:checked:ring-green-400 active:checked:bg-green-400"
            onChange={() => {
              updateDonationData({ frequency: 'single' });
            }}
            checked={donationData.frequency === 'single' && true}
          />
          <label htmlFor="single" className="ml-2 block text-sm text-gray-700">
            One-Time
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="monthly"
            name="frequency"
            value="monthly"
            className="w-4 h-4 rounded-full border-1 appearance-none border-gray-500 hover:border-gray-600 active:border-gray-400
              checked:bg-green-500 checked:border-3 checked:border-white checked:ring-1 checked:ring-green-500
              hover:checked:border-white hover:checked:ring-green-600 hover:checked:bg-green-600 active:checked:ring-green-400 active:checked:bg-green-400"
            onChange={() => {
              updateDonationData({ frequency: 'monthly' });
            }}
            checked={donationData.frequency === 'monthly' && true}
          />
          <label htmlFor="monthly" className="ml-2 block text-sm text-gray-700">
            Monthly Recurring
          </label>
        </div>
      </div>
      
      {donationData.frequency === 'monthly' && (
        <div className="mb-6 text-sm text-gray-500 text-center">
          You will be charged this amount every month until you cancel.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Full name */}
        <div className="mb-6">
          <label htmlFor="customerName" className="block text-gray-700 text-sm font-medium mb-2">
            Your full name
          </label>
          <input
            type="text"
            id="customerName"
            className="rounded-md shadow-sm border-2 focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full pl-4 pr-20 py-3 sm:text-lg border-gray-300 rounded-md"
            placeholder="Full name"
            value={donationData.customerName}
            onChange={(e) => updateDonationData({ customerName: e.target.value })}
            required
            autoFocus={donationData.customerName ? false : true}
          />
        </div>
        
        {/* User email */}
        <div className="mb-6">
          <label htmlFor="customerEmail" className="block text-gray-700 text-sm font-medium mb-2">
            Your email address
          </label>
          <input
            type='email'
            id='customerEmail'
            className="rounded-md shadow-sm border-2 focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full pl-4 pr-20 py-3 sm:text-lg border-gray-300 rounded-md"
            placeholder="Email address"
            value={donationData.email}
            onChange={(e) => {
              updateDonationData({ email: e.target.value });
            }}
            autoCapitalize='none'
            required
          />
        </div>
        
        {/* Amount to give */}
        <div className="mb-6">
          <div className="relative">
            {/* Amount input */}
            <div className="absolute inset-y-14 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{selectedCurrency}</span>
            </div>
            <label htmlFor="customerAmount" className="block text-gray-700 text-sm font-medium mb-2">
              Your donation amount
            </label>

            <div className='flex items-center'>
              <input
                type="number"
                min='0.01'
                step='0.01'
                name="amount"
                id="customerAmount"
                className="w-full h-14 rounded-md shadow-sm [&::-webkit-inner-spin-button]:appearance-none border-2 focus:outline-none focus:ring-green-500 focus:border-green-500 block pl-8 pr-20 sm:text-lg border-gray-300 rounded-md"
                placeholder="Donation amount"
                value={donationData.amount}
                onChange={(e) => {
                  updateDonationData({ amount: e.target.value });
                }}
                // Input validation
                onKeyDown={(e) => {
                  e.key.match(/[+-]/g) && e.preventDefault();
                  e.key.toLowerCase() === 'e' && e.preventDefault();
                }}
                required
              />
              
              {/* Currency selection */}
              <select
                id="currency"
                name="currency"
                className="w-min h-14 border-r-16 border-8 border-transparent -outline-offset-2 outline-gray-300 outline-2 focus:-outline-offset-2 focus:outline-green-500 focus:outline-2 px-2 bg-transparent text-gray-500 sm:text-sm rounded-md"
                value={donationData.currency}
                onChange={(e) => {
                  updateDonationData({ currency: e.target.value });
                  updateSelectedCurrency(e.target.value);
                }}
              >
                <option value="NGN" defaultChecked>NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                {/* <option value="EUR">EUR</option> */}
              </select>
            </div>

          </div>
        </div>

        {/* TODO: INSERT LINK TO TERMS AND CONDITIONS */}
        <div className="mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            See terms and conditions
          </a>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="accent-green-600"
              checked={donationData.agreeToTerms}
              onChange={(e) => updateDonationData({ agreeToTerms: e.target.checked })}
              required
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions<span className="text-red-500 font-bold">&nbsp;*</span>
            </label>
          </div>
          
        </div>

        {/* IS THIS OLD? */}
        {/* <div className="mb-4">
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
        </div> */}

        <div>
          <button
            type="submit"
            className="w-full text-xl flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {/* Proceed to checkout */}
            Proceed to confirmation
          </button>
        </div>
      </form>
    </div>
  );
}
