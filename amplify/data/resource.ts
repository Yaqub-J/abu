import { type ClientSchema, a } from '@aws-amplify/data-schema';

const schema = a.schema({
  Alumni: a
    .model({
      id: a.id(),
      name: a.string(),
      email: a.string(),
      graduationYear: a.number(),
      department: a.string(),
      occupation: a.string().optional(),
      phoneNumber: a.string().optional(),
      address: a.string().optional(),
      donations: a.hasMany('Donation'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization([a.allow.owner(), a.allow.public().to(['read'])]),

  Donation: a
    .model({
      id: a.id(),
      amount: a.number(),
      donorId: a.string(),
      donor: a.belongsTo('Alumni'),
      purpose: a.string(),
      status: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization([a.allow.owner(), a.allow.public().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export default schema;