
import { defineStorage } from '@aws-amplify/backend';

const storage = defineStorage({
  name: 'storage',
  access: ({ identityBased }) => {
    return {
      myFiles: identityBased({
        authenticated: { access: ['read', 'write'] },
        unauthenticated: { access: ['read'] }
      })
    };
  }
});

export default storage;
