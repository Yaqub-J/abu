import React from 'react';

interface DonationData {
  amount: string;
  currency: string;
  frequency: string;
  cardType: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  agreeToTerms: boolean;
}

interface ConfirmationStepProps {
  donationData: DonationData;
  prevStep: () => void;
  handleSubmit: () => void;
  isProcessing?: boolean;
  errorMessage?: string;
}

export default function ConfirmationStep({
  donationData,
  prevStep,
  handleSubmit,
  isProcessing = false,
  errorMessage = ''
}: ConfirmationStepProps) {
  
  // Format card number for display (show only last 4 digits)
  const formatCardNumber = () => {
    if (!donationData.cardNumber) return 'XXXX XXXX XXXX XXXX';
    
    const lastFourDigits = donationData.cardNumber.replace(/\s+/g, '').slice(-4);
    return `XXXX XXXX XXXX ${lastFourDigits}`;
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Donation Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{donationData.amount} {donationData.currency}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Frequency:</span>
            <span className="font-medium capitalize">{donationData.frequency}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium capitalize">{donationData.cardType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Card Number:</span>
            <span className="font-medium">{formatCardNumber()}</span>
          </div>
        </div>
      </div>
      
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              By confirming this donation, you agree to our terms and conditions. Your donation will support ABU alumni projects and initiatives.
              {donationData.frequency === 'monthly' && (
                <span className="block mt-1 font-medium">This is a recurring monthly donation. Your card will be charged this amount every month until you cancel.</span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={isProcessing}
          className="w-1/3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Confirm {donationData.frequency === 'monthly' ? 'Monthly ' : ''}Donation</>
          )}
        </button>
      </div>
    </div>
  );
}
