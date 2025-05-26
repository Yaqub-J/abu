'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would call Amplify's confirmSignUp method here
      // For now, we'll just simulate a successful verification
      console.log('Verification code submitted:', verificationCode);
      
      // After successful verification, redirect to dashboard
      setTimeout(() => {
        router.push('/dash');
      }, 1500);
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    // In a real implementation, you would call Amplify's resendSignUpCode method here
    console.log('Resend code requested');
    alert('Verification code has been resent to your email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-56 h-56 relative mb-4">
            <Image 
              src="/verification.svg" 
              alt="Verification" 
              width={224}
              height={224}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Two-step verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
            We sent a verification code to your email. Please enter the code to verify your account.
          </p>
          <p className="text-center text-xs text-gray-500 mt-1">
            If you didn't receive a code, check your spam folder or click resend code.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
          )}
          
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1">
              Your Verification Code
            </label>
            <input
              id="verification-code"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter 6-digit code"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? 'Verifying...' : 'Confirm Verification Code'}
            </button>
          </div>
          
          <div className="text-sm text-center pt-4">
            Didn't receive a code?{' '}
            <button 
              type="button" 
              onClick={handleResendCode}
              className="text-green-600 hover:text-green-700"
            >
              Resend code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
