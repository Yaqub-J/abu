import { PostConfirmationTriggerHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log('Post-confirmation trigger event:', JSON.stringify(event, null, 2));

  try {
    const dynamoDb = new DynamoDBClient({});
    
    // Get user attributes from the event
    const { sub, email, name, phone_number } = event.request.userAttributes;
    
    // Create initial user profile in DynamoDB
    const now = new Date().toISOString();
    const alumni = {
      id: sub,
      name: name || email.split('@')[0],
      email,
      phoneNumber: phone_number || null,
      department: '',
      graduationYear: 0,
      createdAt: now,
      updatedAt: now
    };

    const putCommand = new PutItemCommand({
      TableName: process.env.ALUMNI_TABLE!,
      Item: marshall(alumni),
      ConditionExpression: 'attribute_not_exists(id)'
    });

    await dynamoDb.send(putCommand);
    console.log('Created initial alumni profile for user:', sub);

    // Add user to default alumni group if it exists
    try {
      const defaultGroupMembership = {
        id: uuidv4(),
        groupId: process.env.DEFAULT_ALUMNI_GROUP_ID || 'alumni-group',
        alumniId: sub,
        role: 'member',
        createdAt: now,
        updatedAt: now
      };

      const groupMemberCommand = new PutItemCommand({
        TableName: process.env.GROUP_MEMBER_TABLE!,
        Item: marshall(defaultGroupMembership)
      });

      await dynamoDb.send(groupMemberCommand);
      console.log('Added user to default alumni group:', sub);
    } catch (groupError) {
      console.error('Error adding user to default group:', groupError);
      // Continue anyway, this is not critical
    }

    return event;
  } catch (error) {
    console.error('Error in post-confirmation trigger:', error);
    // Don't throw here as it would prevent the user from being created
    // Just log the error and return the event
    return event;
  }
};
