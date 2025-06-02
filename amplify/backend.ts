
import { defineBackend } from '@aws-amplify/backend';
import auth from './auth/resource.js';
import storage from './storage/resource.js';

const backend = defineBackend({
  auth,
  storage
});

backend.addOutput({
  custom: {
    public_app_url: "https://main.d38sgrv8g05hjn.amplifyapp.com",
    hydrogen_pay: {
      test: {
        PUBLIC_KEY: "PK_TEST_8d464b0df336b6cb4820b2cc8a319953",
        SECRET_KEY: "SK_TEST_6f646b3aaa4b4e4195d74beb16e6ff43"
      },
      
      live: {
        PUBLIC_KEY: "",
        SECRET_KEY: ""
      }
    }
  }
});

export default backend;
