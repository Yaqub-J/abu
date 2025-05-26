'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

export function AmplifyProvider({ children }: PropsWithChildren) {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Configure Amplify only once on the client side
    Amplify.configure(outputs);
    setIsConfigured(true);
  }, []);

  // Only render children after Amplify has been configured
  if (!isConfigured) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
