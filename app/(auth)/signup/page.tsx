"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { isSignUpComplete, userId } = await signUp({
        username: email,
        password,
        options: {
          autoSignIn: true,
          userAttributes: {
            email
          }
        }
      });
      
      console.log('Sign up successful:', { isSignUpComplete, userId });
      
      if (isSignUpComplete) {
        router.push('/dash');
      }
    } catch (err: any) {
      console.error('Error signing up:', err);
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-56 h-56 mb-4">
            <Image 
              src="/logo.png" 
              alt="ABU Logo" 
              fill
              className="object-contain opacity-25"
              priority
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800">Sign up your account</h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Get started! Sign in with your data that you entered during registration.
          </p>
        </div>

        {/* Social Login Options */}
        <div className="space-y-3 mb-6">
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-[#e9f5eb] text-black py-2 px-4 rounded-md hover:bg-[#d7eeda] transition-colors"
            onClick={() => console.log('Google sign in clicked')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </svg>
            Sign in with Google
          </button>
          
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-[#e9f5eb] text-black py-2 px-4 rounded-md hover:bg-[#d7eeda] transition-colors"
            onClick={() => console.log('Facebook sign in clicked')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Sign in with Facebook
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute bg-white px-4 text-sm text-gray-500">Email</span>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
          )}
          <div className="space-y-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center my-4">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
              Remember my preference
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-md py-3 px-4 hover:bg-gray-800 transition-colors disabled:bg-gray-600"
          >
            {loading ? 'Signing up...' : 'Sign Me In'}
          </button>

          <div className="text-sm text-center pt-4">
            Already have an account?{' '}
            <Link href="/signin" className="text-green-600 hover:text-green-700">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
