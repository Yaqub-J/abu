import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { amount, currency, userId, purpose } = JSON.parse(event.body || '{}');

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        userId,
        purpose
      }
    });

    // Store payment record in DynamoDB
    const dynamoDb = new DynamoDBClient({});
    const putCommand = new PutItemCommand({
      TableName: process.env.DONATION_TABLE!,
      Item: marshall({
        id: paymentIntent.id,
        userId,
        amount,
        currency,
        status: paymentIntent.status,
        purpose,
        createdAt: new Date().toISOString()
      })
    });

    await dynamoDb.send(putCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
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
