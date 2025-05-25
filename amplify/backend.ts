
import { defineBackend } from '@aws-amplify/backend';
import auth from './auth/resource.js';
import storage from './storage/resource.js';

export const backend = defineBackend({
  auth,
  storage
});
