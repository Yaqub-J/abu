'use client';

import { useState } from 'react';
import Image from 'next/image';

import UserDetailsStep from './components/UserDetailsStep';
import ConfirmationStep from './components/ConfirmationStep';
import StepIndicator from './components/StepIndicator';

import outputs from '@/amplify_outputs.json';
import { useRouter } from 'next/navigation';

/*
* Reduced the number of collected data fields
* to match HydrogenPay payment gateway system
*/
interface DonationData {
  amount: string;
  email: string;
  customerName: string;
  currency: string;
  frequency: string;
  agreeToTerms: boolean;
}

/*
* currencyOptions constant dictionary object to handle currency type choice
*/
const currencyOptions = { 'NGN' : '\u20A6', 'USD' : '\u0024', 'GBP' : '\u00A3', 'EUR' : '\u20AC' };


/*
* Payment submission system now required only two steps
*   1) User Details (customerName?, email, amount, frequency, isRecurring)
*   2) Confirmation
*/
export default function DonationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  
  const [donationData, setDonationData] = useState({
    amount: '',
    email: '',
    customerName: '',
    currency: 'NGN',
    frequency: 'single',
    agreeToTerms: false,
  });

  /*
  * Added small functionality to display proper selected currency symbol
  * Original runtime currency selection code:
  *   const [selectedCurrency, setSelectedCurrency] = useState(
  *     currencyOptions[donationData.currency as keyof typeof currencyOptions]
  *   );
  */
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions['NGN']);

  /*
  * Select currency functionality
  */
  const updateSelectedCurrency = (currency: string) => {
    setSelectedCurrency(currencyOptions[currency as keyof typeof currencyOptions])
  };

  /*
  * Error handling function
  *   Empties out all error messages
  */
  const emptyErrorMessage = () => {
    setErrorMessage([]);
  };
  
  const updateDonationData = (data: Partial<DonationData>) => {
    setDonationData({ ...donationData, ...data });
  };

  /*
  * Step increment function
  */
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  /*
  * Step decrement function
  */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      
      // Initiate payment through Hydrogen Pay API
      const response = await fetch('https://api.hydrogenpay.com/bepay/api/v1/merchant/initiate-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': `Bearer ${outputs.custom.hydrogen_pay.test.PUBLIC_KEY}`
        },
        
        /* 
        * NOTE:
        *   THE FIELDS HAVE BEEN UPDATED TO REFLECT 
        *   WHAT THE HYDROGEN PAY API ASKS FOR PER REQUEST
        */
        body: JSON.stringify({
          amount: donationData.amount,
          email: donationData.email,
          customerName: donationData.customerName,
          currency: donationData.currency,
          description: `${donationData.frequency === 'single' ? 'Single' : 'Monthly'} Donation to ABU`,
          /*
          * NOTE:
          *   JSON string format for meta field
          *   Use JSON format in order to parse
          *   data more easily
          */
          meta: `{"donation_frequency": "${donationData.frequency}"}`,
          /*
          * NOTE:
          *   TODO:
          *     The 'frequency' field must be updated to reflect
          *     multiple possible recurring donation options should
          *     more options be allowed
          */
          frequency: donationData.frequency === 'monthly' ? 2 : null,
          isRecurring: donationData.frequency !== 'single' ? true : false,
          callback: `${outputs.custom.public_app_url}/donations/thank-you/`,
          /*
          * NOTE:
          *   'endDate' field is NECESSARY for submitting recurring payments
          *   Hardcoded endDate to far into the future for 'recurring' payments
          * 
          * TODO:
          *   CREATE FUNCTION TO PROPERLY ALLOW CUSTOMERS TO SET
          *   RECURRING DONATION END DATE IF THEY DESIRE TO.
          *   DESIGN FUNCTION TO PROPERLY SET TIME OF END DATE,
          *   OR SET TO ESSENTIALLY 'FOREVER' IF NO END DATE IS CHOSEN.
          */
         endDate: '3025-12-31T00:00:00.000Z'
        }),
      });


      // /*
      // * DEBUGGING PURPOSES ONLY
      // *   DO NOT DELETE THE BELOW COMMENTS AND CODE
      // *   THIS IS A TEST FETCH REQUEST
      // *   IT IS A COPY OF THE ORIGINAL
      // *   FOR TESTING PURPOSES ONLY
      // */
      // const newResponse = await fetch('https://api.hydrogenpay.com/bepay/api/v1/merchant/initiate-payment/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Cache-Control': 'no-cache',
      //     'Authorization': `Bearer ${outputs.custom.hydrogen_pay.test.PUBLIC_KEY}`
      //   },

      //   /* 
      //   * DEBUG
      //   *   DO NOT DELETE THE BELOW COMMENTS
      //   *   THEY ARE FOR DEBUGGING/TESTING PURPOSES
      //   * 
      //   * NOTE:
      //   *   THE FIELDS HAVE BEEN UPDATED TO REFLECT 
      //   *   WHAT THE HYDROGEN PAY API ASKS FOR PER REQUEST
      //   */
      //   body: JSON.stringify({
      //     amount: donationData.amount,
      //     email: donationData.email,
      //     customerName: donationData.customerName,
      //     currency: donationData.currency,
      //     description: `${donationData.frequency === 'single' ? 'Single' : 'Monthly'} Donation to ABU`,
      //     /*
      //     * NOTE:
      //     *   JSON string format for meta field
      //     *   Use JSON format in order to parse
      //     *   data more easily
      //     */
      //     meta: `{"donation_frequency": "${donationData.frequency}"}`,
      //     /*
      //     * NOTE:
      //     *   TODO:
      //     *     The 'frequency' field must be updated to reflect
      //     *     multiple possible recurring donation options should
      //     *     more options be allowed
      //     */
      //     frequency: donationData.frequency === 'monthly' ? 2 : null,
      //     isRecurring: donationData.frequency !== 'single' ? true : false,
      //     callback: `${outputs.custom.public_app_url}/donations/thank-you/`,
      //     /*
      //     * NOTE:
      //     *   'endDate' field is NECESSARY for submitting recurring payments
      //     *   Hardcoded endDate to far into the future for 'recurring' payments
      //     * 
      //     * TODO:
      //     *   CREATE FUNCTION TO PROPERLY ALLOW CUSTOMERS TO SET
      //     *   RECURRING DONATION END DATE IF THEY DESIRE TO.
      //     *   DESIGN FUNCTION TO PROPERLY SET TIME OF END DATE,
      //     *   OR SET TO ESSENTIALLY 'FOREVER' IF NO END DATE IS CHOSEN.
      //     */
      //     endDate: '3025-12-31T00:00:00.000Z'
      //     endDate: `${donationData.frequency !== 'single' ? '3025-12-31T00:00:00.000Z' : ''}` // -- THIS LINE CURRENTLY DOES NOT WORK
      //   }),
      // });
      

      const data = await response.json();
      
      /*
      * NEW ERROR HANDLING
      *   Print error(s) to screen
      *   whether single or multiple
      */
      if (data.statusCode !== '90000') {
        let eMsgArray:string[] = []; // -- Array of error messages
        
        // Display multiple error messages
        if (data.error && data.error.length >= 1) {
          data.error.map(async (e: any) => {
            console.error('Error:', e.message);
            eMsgArray = [
              ...eMsgArray,
              e.message
            ]
          });
          setErrorMessage(eMsgArray);
          eMsgArray = []; // -- clear out array
          throw new Error('An error has occurred')
        // Display single error message
        } else {
          console.error('Error:', data.message);
          setErrorMessage([data.message]);
          eMsgArray = []; // -- clear out array
          throw new Error(data.message || 'Payment initiation failed');
        }
      }
      
      // DEBUG
      // console.log('Payment initiated successfully:', data);
      
      /*
      * TEMPORARY FIX
      * Fixed payment gateway redirect
      * TODO: FIX PAYMENT GATEWAY REDIRECT (Maybe don't use window.href.location)
      *   CURRENTLY TOO SLOW - LEADING TO ERROR 504 GATEWAY TIMEOUT
      *   POSSIBLY BECAUSE OF SLOW INTERNET ACCESS
      */
      if (data.data && data.data.url) {
        router.push(data.data.url);
      }
      
    } catch (error: any) {
      console.log('Error:\n\t', errorMessage);
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
            selectedCurrency={selectedCurrency}
            updateSelectedCurrency={updateSelectedCurrency}
          />
        )}
        
        {/*
          NOTE:
            UNNECESSARY STEP -- COMMENTED OUT
            FIXED BECAUSE THIS STEP COLLECTS UNNECESSARY INFORMATION
            TO NAVIGATE TO HYDROGEN PAYMENT LINK
        */}
        {/* {currentStep === 2 && (
          <PaymentMethodStep 
            donationData={donationData} 
            updateDonationData={updateDonationData} 
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )} */}
        
        {currentStep === 2 && (
          <ConfirmationStep 
            donationData={donationData} 
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isProcessing={isProcessing}
            errorMessage={errorMessage}
            emptyErrorMessage={emptyErrorMessage}
          />
        )}
      </div>
    </div>
  );
}
