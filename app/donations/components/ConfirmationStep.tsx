interface DonationData {
  amount: string;
  email: string;
  customerName: string;
  currency: string;
  frequency: string;
  agreeToTerms: boolean;
}

interface ConfirmationStepProps {
  donationData: DonationData;
  prevStep: () => void;
  handleSubmit: () => void;
  isProcessing?: boolean;
  errorMessage?: string[];
  emptyErrorMessage: () => void;
}

export default function ConfirmationStep({
  donationData,
  prevStep,
  handleSubmit,
  isProcessing = false,
  errorMessage = [],
  emptyErrorMessage
}: ConfirmationStepProps) {

  return (
    <div className="mt-8">
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Donation Summary</h2>
        
        <div className="space-y-5">
          <div className="flex justify-between">
            <div className="text-gray-600 w-28">Your Name:</div>
            <div className="flex-grow h-0 mt-3 mr-6 border-t-4 border-dotted border-gray-600 opacity-50" />
            <div className="font-semibold capitalize">{donationData.customerName}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-gray-600 w-28">Your Email:</div>
            <div className="flex-grow h-0 mt-3 mr-6 border-t-4 border-dotted border-gray-600 opacity-50" />
            <div className="font-semibold lowercase">{donationData.email.toLowerCase()}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-gray-600 w-28">Amount:</div>
            <div className="flex-grow h-0 mt-3 mr-6 border-t-4 border-dotted border-gray-600 opacity-50" />
            <div className="font-semibold">{donationData.amount} {donationData.currency}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-gray-600 w-28">Frequency:</div>
            <div className="flex-grow h-0 mt-3 mr-6 border-t-4 border-dotted border-gray-600 opacity-50" />
            <div className="font-semibold capitalize">{donationData.frequency === 'single' ? 'One-Time' : 'Monthly'}</div>
          </div>
        </div>
      </div>
      
      {/* Red error label */}
      <>
        <div className='space-y-2 mb-8'>
          {errorMessage.length > 0 && errorMessage.map((eMsg) => 
            <div key={eMsg} className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                {/* Red 'X' icon */}
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Text */}
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {eMsg}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
      
      {/* Yellow warning label */}
      <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8'>
        <div className='flex items-center'>
          {/* Yellow '!' icon */}
          <div className='flex-shrink-0'>
            <img src='./icons/important-warning-sign-yellow-64-by-64.svg' alt="warning accepted card types" className='w-4 h-4' />
          </div>

          {/* Text */}
          <div className='ml-3'>
            <span className='text-sm text-yellow-700'>
              For&nbsp;
              <span className='font-bold'>card payments</span>
              , we&nbsp;
              <span className='font-bold'>only accept</span>
              &nbsp;the following:&nbsp;
            </span>
          </div>
        </div>
        <ul className='mt-2 text-sm text-yellow-700 font-bold ml-10 hover:rounded-xs hover:outline-2 hover:outline-offset-3 w-fit'>
          <li>&#8226;&nbsp; Visa</li>
          <li>&#8226;&nbsp; Mastercard</li>
          <li>&#8226;&nbsp; Verve</li>
        </ul>
      </div>
      
      {/* Blue note label */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          {/* Blue 'i' icon */}
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Text */}
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              By confirming this donation, you agree to our <a href='#' className='font-bold hover:underline cursor-pointer'>terms and conditions</a>. Your donation will support ABU alumni projects and initiatives.
              {donationData.frequency === 'monthly' && (
                <span className="block mt-2 font-medium">This is a <span className='font-bold'>recurring monthly donation</span>. Your card will be charged this amount ({donationData.amount} {donationData.currency}) every month <span className='font-bold'>until you cancel.</span></span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex space-x-4">
        {/* Back button */}
        <button
          type="button"
          onClick={() =>{
            prevStep();
            emptyErrorMessage();
          }}
          disabled={isProcessing}
          className="w-1/3 text-xl py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          Back
        </button>

        {/* Confirm Donation button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-2/3 text-xl flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
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
            <>Confirm&nbsp; <span className='font-bold'>{donationData.amount} {donationData.currency}</span> &nbsp;{donationData.frequency === 'monthly' ? 'Monthly ' : ''}Donation</>
          )}
        </button>
      </div>
    </div>
  );
}
