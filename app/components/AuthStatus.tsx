'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function AuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  // const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const currentUser = await getCurrentUser();
      setIsAuthenticated(true);
      setUserName(currentUser.username);
      // setUserId(currentUser.userId);
      // console.log(currentUser.userId);
    } catch (err) {
      setIsAuthenticated(false);
      setUserName('');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsAuthenticated(false);
      router.push('/dash');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  }

  if (loading) {
    return <div className="text-sm">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Signed in as {userName}</span>
      {/* <span className="text-sm">Signed in as {userId}</span> */}
      <button
        onClick={handleSignOut}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
