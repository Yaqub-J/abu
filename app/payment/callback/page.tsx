'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'success' | 'failed' | 'processing' | ''>('');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    // Get payment parameters from URL
    const reference = searchParams.get('reference');
    const paymentStatus = searchParams.get('status');
    
    if (reference) {
      // You could verify the payment status server-side here
      // For now, we'll just use the status from the URL
      setStatus(paymentStatus === 'successful' ? 'success' : 
                paymentStatus === 'failed' ? 'failed' : 'processing');
      
      setDetails({
        reference,
        status: paymentStatus,
        timestamp: new Date().toISOString()
      });
    } else {
      setStatus('failed');
    }
    
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              {status === 'success' && (
                <>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
                  <p className="mt-2 text-gray-600">Thank you for your payment.</p>
                </>
              )}
              
              {status === 'processing' && (
                <>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                    <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Processing</h2>
                  <p className="mt-2 text-gray-600">Your payment is being processed.</p>
                </>
              )}
              
              {status === 'failed' && (
                <>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Failed</h2>
                  <p className="mt-2 text-gray-600">We couldn't process your payment. Please try again.</p>
                </>
              )}
            </div>
            
            {details && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <dl className="divide-y divide-gray-200">
                  <div className="py-2 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Reference</dt>
                    <dd className="text-sm text-gray-900">{details.reference}</dd>
                  </div>
                  <div className="py-2 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900 capitalize">{details.status}</dd>
                  </div>
                  <div className="py-2 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(details.timestamp).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <Link href="/dash" className="text-sm font-medium text-green-600 hover:text-green-500">
                Return to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment details...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
