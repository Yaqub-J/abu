import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignUpPage: React.FC = () => {
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
          
          <h1 className="text-2xl font-bold text-gray-800">Sign in your account</h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Get started! Sign in with your data that you entered during registration
          </p>
        </div>

        <div className="space-y-4">
          <button className="flex items-center justify-center w-full rounded-md p-2 bg-green-100 hover:bg-green-200 transition-colors text-gray-700">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <button className="flex items-center justify-center w-full rounded-md p-2 bg-green-100 hover:bg-green-200 transition-colors text-gray-700">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
            Sign in with Facebook
          </button>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember my preference
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="text-gray-600 hover:text-gray-800">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-800 transition-colors"
          >
            Sign Me In
          </button>

          <div className="text-sm text-center pt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="text-green-600 hover:text-green-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;