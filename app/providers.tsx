
'use client';

import { Amplify } from 'aws-amplify';
import { PropsWithChildren } from 'react';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      signUpVerificationMethod: 'code'
    }
  }
});

export function Providers({ children }: PropsWithChildren) {
  return children;
}
