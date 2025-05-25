import { defineAuth } from "@aws-amplify/backend";

const auth = defineAuth({
  loginWith: {
    email: true
  }
});

export default auth;