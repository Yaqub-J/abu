'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserDetailsStep from './components/UserDetailsStep';
import PaymentMethodStep from './components/PaymentMethodStep';
import ConfirmationStep from './components/ConfirmationStep';
import StepIndicator from './components/StepIndicator';
import HydrogenPayButton from '../components/HydrogenPayButton';

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

export default function DonationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
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

  const updateDonationData = (data: Partial<DonationData>) => {
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
    try {
      setIsProcessing(true);
      setErrorMessage('');
      
      // Initiate payment through Hydrogen Pay API
      const response = await fetch('/api/hydrogen-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(donationData.amount) || 0,
          customerName: donationData.cardHolder,
          email: 'customer@example.com', // This should be collected in UserDetailsStep
          currency: donationData.currency,
          description: `${donationData.frequency === 'monthly' ? 'Monthly' : 'One-time'} Donation to ABU`,
          meta: `donation_type=${donationData.frequency}`,
          frequency: donationData.frequency === 'monthly' ? 'monthly' : 'one-off',
          isRecurring: donationData.frequency === 'monthly',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Payment initiation failed');
      }
      
      console.log('Payment initiated successfully:', data);
      
      // Redirect to payment gateway
      if (data.redirectUrl || data.paymentUrl) {
        window.location.href = data.redirectUrl || data.paymentUrl;
      }
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'Payment initiation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side with image and text */}
      <div className="w-full md:w-1/2 bg-gray-800 text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/donate.jpg"
            alt="Donation"
            fill
            className="object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Make a<br />Donation<br />Today
          </h1>
          <div className="bg-black-50 p-6 rounded-lg">
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
            isProcessing={isProcessing}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
}
