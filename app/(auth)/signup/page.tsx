
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({
        username: email,
        password,
        options: {
          autoSignIn: true
        }
      });
      router.push('/dash');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40 mb-4">
            <Link href={'/'}>
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill
                className="object-contain opacity-25"
              />
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Get started! Sign up Now!
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>

          <div className="text-sm text-center pt-2">
            Already have an account?{' '}
            <Link href="/signin" className="text-green-600 hover:text-green-700">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
