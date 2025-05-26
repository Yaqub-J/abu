import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { randomUUID } from 'crypto';

/**
 * Mock payment handler that doesn't rely on Stripe
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { amount, currency, userId, purpose } = JSON.parse(event.body || '{}');

    // Generate a mock payment ID and client secret
    const paymentId = `pi_${randomUUID().replace(/-/g, '')}`;
    const clientSecret = `${paymentId}_secret_${randomUUID().replace(/-/g, '').substring(0, 24)}`;
    const status = 'requires_payment_method'; // Simulating initial payment status

    // Store payment record in DynamoDB
    const dynamoDb = new DynamoDBClient({});
    const putCommand = new PutItemCommand({
      TableName: process.env.DONATION_TABLE!,
      Item: marshall({
        id: paymentId,
        userId,
        amount,
        currency,
        status,
        purpose,
        createdAt: new Date().toISOString()
      })
    });

    await dynamoDb.send(putCommand);

    console.log(`Created mock payment intent: ${paymentId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret
      })
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process payment' })
    };
  }
};
