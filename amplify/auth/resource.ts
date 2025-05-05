
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for School Portal",
      verificationEmailBody: (code) => `Your verification code is: ${code}`,
    }
  },
  userAttributes: {
    email: { required: true, mutable: true },
    // Using standard attributes instead of custom 'name'
    given_name: { required: true, mutable: true },
    family_name: { required: true, mutable: true },
    
    // Custom attributes for alumni with correct prefix
    'custom:graduationYear': { 
      required: false, 
      mutable: true,
      type: 'number' 
    },
    'custom:department': { 
      required: false,
      mutable: true,
      type: 'string'
    },
    'custom:isAlumni': {
      required: true,
      mutable: false,
      type: 'boolean'
    }
  },
  multifactor: {
    mode: "REQUIRED",
    sms: true
  },
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true
  },
  userPoolGroups: ["Alumni", "Admins", "ContentModerators"]
});
