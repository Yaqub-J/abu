
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'alumniStorage',
  permissions: {
    authenticated: {
      access: ['read', 'write'],
      allowedPaths: ['public/*', 'protected/${cognito-identity.amazonaws.com:sub}/*']
    },
    public: {
      access: ['read'],
      allowedPaths: ['public/*']
    }
  }
});
