'use client';

import PaymentForm from '@/app/components/PaymentForm';
import Link from 'next/link';

export default function PaymentDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">HydrogenPay Integration Demo</h1>
          <p className="mt-2 text-gray-600">
            This page demonstrates how to use the HydrogenPay payment gateway.
          </p>
          <Link href="/dash" className="mt-4 inline-block text-sm text-green-600 hover:text-green-500">
            ← Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Form</h2>
              <PaymentForm />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Integration Guide</h2>
              <div className="prose">
                <p>
                  To use the HydrogenPay payment gateway in your own components:
                </p>
                
                <ol className="list-decimal pl-5 space-y-2 mt-2">
                  <li>Import the HydrogenPayButton component</li>
                  <li>Add it to your form or page</li>
                  <li>Pass the required payment details</li>
                  <li>Handle success and error callbacks</li>
                </ol>
                
                <div className="mt-4 bg-gray-800 text-white p-4 rounded-md overflow-auto text-sm">
                  <pre>{`import HydrogenPayButton from '@/app/components/HydrogenPayButton';

<HydrogenPayButton
  amount={50}
  customerName="Customer Name"
  email="customer@example.com"
  description="Payment for services"
  buttonText="Pay Now"
  onSuccess={(data) => {
    console.log('Payment successful:', data);
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
  }}
/>`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
