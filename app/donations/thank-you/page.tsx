'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import outputs from '@/amplify_outputs.json';

export default function ThankYouPage() {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const transactionRef = useSearchParams().get('TransactionRef');

  /*
  * NOTE:
  *   THIS IS A NECESSARY FUNCTION
  *   Utility function
  *   Validate JSON
  */
  const isValidJSON = (string: string) => {
    try {
      JSON.parse(string);
      return true;
    } catch (e: any) {
      return false;
    } finally {
      return false;
    }
  };

  /*
  * NEW THANK-YOU PAGE DATA HANDLING
  * Get transaction data from transaction reference number
  * provided by HydrogenPay gateway payment system as URL parameter
  */
  const getTransactionData = async () => {
    try {
      const response = await fetch('https://api.hydrogenpay.com/bepay/api/v1/Merchant/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': `Bearer ${outputs.custom.hydrogen_pay.test.PUBLIC_KEY}`
        },
        body: JSON.stringify({
          'transactionRef': `${transactionRef}`
        })
      });
  
      const data = await response.json();

      // DEBUG
      // console.log(data);

      if (isValidJSON(data.data.meta)) {
        setTransactionDetails(
          {
            ...{
              transactionRef,
              amount: data.data.amount,
              fee: data.data.fees,
              currency: data.data.currency,
              status: data.data.transactionStatus
            },
            ...JSON.parse(data.data.meta)
          }
        );
      } else {
        setTransactionDetails(
          {
            transactionRef,
            amount: data.data.amount,
            fee: data.data.fees,
            currency: data.data.currency,
            donation_frequency: 'N/A',
            status: data.data.transactionStatus
          }
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  }


  /*
  * USE-EFFECT FUNCTION FOR GATHERING
  * TRANSACTION REFERENCE NUMBER DATA
  */
  useEffect(() => {
    getTransactionData();
  }, [transactionRef]);
  

  return (
    <div className="min-h-screen py-12 flex relative">
      {/* Background image */}
      <div className='absolute inset-0 bg-gray-800 z-0'>
        <Image
          src="/donate-2.jpg"
          alt="Donation"
          fill
          className="object-cover opacity-70"
        />
      </div>

      {/* Thank you note */}
      <div className="max-w-2xl mx-auto px-6 pt-24 z-10">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            {
              /*
              * FIRST CONDITION CHECK
              * Data is currently not loaded
              */
              !transactionDetails
              ?
              /*
              * Loading icon
              * This displays on the screen first, while the data is being fetched
              */
              <>
              <div className="size-20 rounded-full flex items-center justify-center">
                <svg
                  className="animate-spin founded-full size-16 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              </>
              :
              /*
              * SECOND CONDITION CHECK
              * Data is now loaded
              * Check to see if transaction was successful or not
              */
              transactionDetails && transactionDetails.status === 'Paid'
              ?
              /*
              * Successful transaction
              * Green checkmark icon
              */
              <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="size-12 text-green-600" 
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
              :
              /* 
              * Failed transaction
              * Yellow sad face icon
              */
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12 text-yellow-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </div>
            }
          </div>
          
          {
            /*
            * FIRST CONDITION CHECK
            * Data is currently not loaded
            */
            !transactionDetails
            ?
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Loading, please wait...</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your patience while your donation confirmation is loading.
                Please do not navigate away from this page.
              </p>
            </>
            :
            /*
            * SECOND CONDITION CHECK
            * Data is now loaded
            * Check to see if transaction was successful or not
            */
            transactionDetails && transactionDetails.status === 'Paid'
            ?
            /*
            * Successful transaction
            * Display correct text
            */
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank you for your donation!</h1>
              <p className="text-gray-600 mb-8">
                Your generosity helps us continue our mission and make a positive impact in our community.
              </p>
            </>
            :
            /*
            * Failed transaction
            * Display correct text
            */
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong...</h1>
              <p className="text-gray-600 mb-8">
                We're sorry, but something seems to have gone wrong with your donation.
                Please try again.
              </p>
            </>
          }

          {transactionDetails && (
            <div className="mb-8 bg-gray-50 p-4 rounded-md inline-block sm:w-4/5  w-11/12">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Transaction Details</h2>
              <div className="text-sm text-gray-600 text-left font-medium text-wrap space-y-1">
                <div className="flex justify-between">
                  <span className="">Reference Number:</span>
                  <div className="flex-grow max-w-full h-0 mt-2 mx-2 sm:mx-3 border-t-4 border-dotted border-gray-600 opacity-50" />
                  <span className="text-wrap">{transactionDetails.transactionRef}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Amount Paid:</span>
                  <div className="flex-grow max-w-full h-0 mt-2 mx-2 sm:mx-3 border-t-4 border-dotted border-gray-600 opacity-50" />
                  <span>{transactionDetails.amount} {transactionDetails.currency}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Fee:</span>
                  <div className="flex-grow max-w-full h-0 mt-2 mx-2 sm:mx-3 border-t-4 border-dotted border-gray-600 opacity-50" />
                  <span>{transactionDetails.fee} {transactionDetails.currency}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Frequency:</span>
                  <div className="flex-grow max-w-full h-0 mt-2 mx-2 sm:mx-3 border-t-4 border-dotted border-gray-600 opacity-50" />
                  {
                    transactionDetails.donation_frequency === 'single' || transactionDetails.donation_frequency === 'N/A'?
                    <span>One-Time</span> :
                    <span>Monthly</span>
                  }
                </div>

                <div className="flex justify-between">
                  <span className="">Status:&nbsp;</span>
                  <div className="flex-grow max-w-full h-0 mt-2 mx-2 sm:mx-3 border-t-4 border-dotted border-gray-600 opacity-50" />
                  {
                    transactionDetails.status === 'Paid' ?
                    <span className="text-green-600">Success</span> : 
                    <span className="text-red-600">Failed</span>
                  }
                </div>
              </div>
            </div>
          )}
          
          {
            /*
            * Display buttons based on transactionDetails data availability
            */
            transactionDetails
            &&
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
          }
        </div>
      </div>
    </div>
  );
}
