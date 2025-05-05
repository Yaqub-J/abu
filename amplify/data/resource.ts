
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { type Schema } from '../codegen/Schema';

const schema = a.schema({
  User: a.model({
    email: a.string().required(),
    username: a.string().required(),
    userRole: a.enum(['ADMIN', 'ALUMNI', 'CONTENT_MODERATOR', 'EVENT_MANAGER']).required(),
    status: a.enum(['ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE']).required(),
    userProfile: a.hasOne('UserProfile'),
    alumniProfile: a.hasOne('AlumniProfile')
  }).authorization([
    a.allow.owner(),
    a.allow.groups(['Admins'])
  ]),

  UserProfile: a.model({
    userId: a.string().required(),
    firstName: a.string().required(),
    lastName: a.string().required(),
    middleName: a.string(),
    bio: a.string(),
    avatar: a.string(),
    phoneNumber: a.string(),
    address: a.string(),
    city: a.string(),
    state: a.string(),
    country: a.string(),
    privacySettings: a.json()
  }).authorization([
    a.allow.owner(),
    a.allow.groups(['Admins'])
  ]),

  AlumniProfile: a.model({
    userId: a.string().required(),
    graduationYear: a.integer().required(),
    department: a.string().required(),
    degree: a.string().required(),
    employmentHistory: a.hasMany('Employment'),
    educationDetails: a.hasMany('Education'),
    connections: a.hasMany('Connection'),
    projects: a.hasMany('ProjectParticipant'),
    groups: a.hasMany('GroupMember')
  }).authorization([
    a.allow.owner(),
    a.allow.groups(['Admins']),
    a.allow.private().read()
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});
