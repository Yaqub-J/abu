
import { defineStorage } from '@aws-amplify/backend';

const storage = defineStorage({
  name: 'storage',
  access: (allow) => {
    allow.auth();
    allow.public();
  }
});

export default storage;
