'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get the username from query params
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setUsername(userEmail);
    } else {
      // If no username is provided, redirect to signup
      router.push('/signup');
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username) {
      setError('Username is missing. Please go back to sign up.');
      setLoading(false);
      return;
    }

    try {
      // Call Amplify's confirmSignUp method
      await confirmSignUp({
        username,
        confirmationCode: verificationCode
      });
      
      // After successful verification, redirect to dashboard
      router.push('/dash');
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!username) {
      setError('Username is missing. Please go back to sign up.');
      return;
    }
    
    setLoading(true);
    try {
      // Call Amplify's resendSignUpCode method
      await resendSignUpCode({
        username
      });
      alert('Verification code has been resent to your email');
    } catch (err: any) {
      console.error('Error resending code:', err);
      setError(err.message || 'Failed to resend verification code');
    } finally {
      setLoading(false);
    }
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
