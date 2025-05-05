
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for School Portal",
      verificationEmailBody: "Your verification code is: {####}",
    }
  },
  userAttributes: {
    // Required system attributes
    email: { required: true, mutable: true },
    name: { required: true, mutable: true },
    
    // Custom attributes for alumni
    graduationYear: { 
      required: false, 
      mutable: true,
      type: 'number' 
    },
    department: { 
      required: false,
      mutable: true,
      type: 'string'
    },
    isAlumni: {
      required: true,
      mutable: false,
      type: 'boolean'
    }
  },
  multifactor: {
    mode: "required",
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
