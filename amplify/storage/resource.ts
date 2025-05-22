
import { defineStorage } from '@aws-amplify/backend';

const storage = defineStorage({
  name: 'storage',
  access: ['auth', 'public']
});

export default storage;
