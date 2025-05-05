import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    username: true
  },
  userAttributes: {
    email: { required: true, mutable: true },
    username: { required: true, mutable: false },
    userRole: { 
      required: true,
      mutable: true,
      type: 'string',
      values: ['ADMIN', 'ALUMNI', 'CONTENT_MODERATOR', 'EVENT_MANAGER']
    },
    status: {
      required: true,
      mutable: true,
      type: 'string',
      values: ['ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE']
    },
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
    mode: "OPTIONAL",
    sms: true
  },
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true
  },
  userPoolGroups: ["Admins", "Alumni", "ContentModerators", "EventManagers"]
});