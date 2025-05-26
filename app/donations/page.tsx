'use client';

import { useState } from 'react';
import Image from 'next/image';
import UserDetailsStep from './components/UserDetailsStep';
import PaymentMethodStep from './components/PaymentMethodStep';
import ConfirmationStep from './components/ConfirmationStep';
import StepIndicator from './components/StepIndicator';

export default function DonationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: '',
    currency: 'NGN',
    frequency: 'one-off',
    cardType: 'mastercard',
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false,
  });

  const updateDonationData = (data: Partial<typeof donationData>) => {
    setDonationData({ ...donationData, ...data });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    // Handle final submission logic here
    console.log('Donation submitted:', donationData);
    // You would typically call your API here to process the donation
    alert('Thank you for your donation!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side with image and text */}
      <div className="w-full md:w-1/2 bg-gray-800 text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/donation-background.jpg"
            alt="Donation"
            fill
            className="object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Make a<br />Donation<br />Today
          </h1>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg">
            <p className="text-sm md:text-base">
              At ABU, we're proud to celebrate the incredible contributions of our alumni
              and the transformative projects they've spearheaded. From groundbreaking
              initiatives to community-driven efforts, their work continues to inspire and
              create lasting change.
            </p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 bg-white p-8 lg:p-12">
        <StepIndicator currentStep={currentStep} />
        
        {currentStep === 1 && (
          <UserDetailsStep 
            donationData={donationData} 
            updateDonationData={updateDonationData} 
            nextStep={nextStep} 
          />
        )}
        
        {currentStep === 2 && (
          <PaymentMethodStep 
            donationData={donationData} 
            updateDonationData={updateDonationData} 
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <ConfirmationStep 
            donationData={donationData} 
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
