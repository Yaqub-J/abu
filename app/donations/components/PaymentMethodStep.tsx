import React from 'react';
import Image from 'next/image';

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

interface PaymentMethodStepProps {
  donationData: DonationData;
  updateDonationData: (data: Partial<DonationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PaymentMethodStep({
  donationData,
  updateDonationData,
  nextStep,
  prevStep
}: PaymentMethodStepProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-3">Card Type</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="mastercard"
                name="cardType"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                checked={donationData.cardType === 'mastercard'}
                onChange={() => updateDonationData({ cardType: 'mastercard' })}
              />
              <label htmlFor="mastercard" className="ml-2">
                <div className="border rounded-md px-3 py-2 flex items-center justify-center w-24 h-12">
                  <Image 
                    src="/mastercard-logo.png" 
                    alt="Mastercard" 
                    width={60} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="cardType"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                checked={donationData.cardType === 'paypal'}
                onChange={() => updateDonationData({ cardType: 'paypal' })}
              />
              <label htmlFor="paypal" className="ml-2">
                <div className="border rounded-md px-3 py-2 flex items-center justify-center w-24 h-12">
                  <Image 
                    src="/paypal-logo.png" 
                    alt="PayPal" 
                    width={60} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="verve"
                name="cardType"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                checked={donationData.cardType === 'verve'}
                onChange={() => updateDonationData({ cardType: 'verve' })}
              />
              <label htmlFor="verve" className="ml-2">
                <div className="border rounded-md px-3 py-2 flex items-center justify-center w-24 h-12">
                  <Image 
                    src="/verve-logo.png" 
                    alt="Verve" 
                    width={60} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="visa"
                name="cardType"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                checked={donationData.cardType === 'visa'}
                onChange={() => updateDonationData({ cardType: 'visa' })}
              />
              <label htmlFor="visa" className="ml-2">
                <div className="border rounded-md px-3 py-2 flex items-center justify-center w-24 h-12">
                  <Image 
                    src="/visa-logo.png" 
                    alt="Visa" 
                    width={60} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="cardHolder" className="block text-gray-700 text-sm font-medium mb-2">
            Card Holder
          </label>
          <input
            type="text"
            id="cardHolder"
            className="focus:ring-green-500 focus:border-green-500 block w-full py-3 px-4 border-gray-300 rounded-md"
            placeholder="5067  0899  5633  XXXX  XXXX"
            value={donationData.cardHolder}
            onChange={(e) => updateDonationData({ cardHolder: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              className="focus:ring-green-500 focus:border-green-500 block w-full py-3 px-4 border-gray-300 rounded-md border-2 border-green-500"
              placeholder="5067  0899  5633  XXXX  XXXX"
              value={donationData.cardNumber}
              onChange={(e) => updateDonationData({ cardNumber: e.target.value })}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/paypal-small.png"
                alt="PayPal"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-8">
          <div className="w-1/2">
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="focus:ring-green-500 focus:border-green-500 block w-full py-3 px-4 border-gray-300 rounded-md"
              placeholder="mm/yyyy"
              value={donationData.expiryDate}
              onChange={(e) => updateDonationData({ expiryDate: e.target.value })}
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="focus:ring-green-500 focus:border-green-500 block w-full py-3 px-4 border-gray-300 rounded-md"
              placeholder="..."
              value={donationData.cvv}
              onChange={(e) => updateDonationData({ cvv: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Donate {donationData.amount} {donationData.currency}
          </button>
        </div>
      </form>
    </div>
  );
}
