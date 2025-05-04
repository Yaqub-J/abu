
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome! Verify your email",
      verificationEmailBody: "Your verification code is: {####}",
    },
    // You can also enable phone if needed
    // phone: true
  },
  userAttributes: {
    // Required attributes
    email: { required: true, mutable: true },
    name: { required: true, mutable: true },
    
    // Optional attributes
    profilePicture: { required: false, mutable: true },
  },
  multifactor: {
    mode: "optional", // or "required" if you want to enforce MFA
    sms: true,
  },
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true,
  }
});
