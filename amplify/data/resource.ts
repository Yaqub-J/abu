import { type ClientSchema, a } from '@aws-amplify/data-schema';

const schema = a.schema({
  Alumni: a
    .model({
      id: a.id(),
      name: a.string(),
      email: a.string(),
      graduationYear: a.integer(),
      department: a.string(),
      occupation: a.string(),
      phoneNumber: a.string(),
      address: a.string(),
      donations: a.hasMany('Donation', 'donor'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  Donation: a
    .model({
      id: a.id(),
      amount: a.integer(),
      currency: a.string(),
      donorId: a.string(),
      donor: a.belongsTo('Alumni', 'donations'),
      purpose: a.string(),
      status: a.string(),
      paymentMethod: a.string(),
      transactionId: a.string(),
      receipt: a.string(),
      message: a.string(),
      isAnonymous: a.boolean(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  Event: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      startDate: a.datetime(),
      endDate: a.datetime(),
      location: a.string(),
      imageUrl: a.string(),
      capacity: a.integer(),
      organizerId: a.string(),
      status: a.string(),
      isVirtual: a.boolean(),
      virtualMeetingLink: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  EventAttendee: a
    .model({
      id: a.id(),
      eventId: a.string(),
      alumniId: a.string(),
      status: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  Group: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      imageUrl: a.string(),
      type: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  GroupMember: a
    .model({
      id: a.id(),
      groupId: a.string(),
      alumniId: a.string(),
      role: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  Project: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      status: a.string(),
      startDate: a.datetime(),
      endDate: a.datetime(),
      imageUrl: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  ProjectMember: a
    .model({
      id: a.id(),
      projectId: a.string(),
      alumniId: a.string(),
      role: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),

  Notification: a
    .model({
      id: a.id(),
      type: a.string(),
      title: a.string(),
      message: a.string(),
      recipientId: a.string(),
      seen: a.boolean(),
      data: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }),
});

export type Schema = ClientSchema<typeof schema>;

const data = schema;
export default data;