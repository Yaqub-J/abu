import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDBClient({});
    
    // Get user stats
    const userStatsParams = {
      TableName: process.env.ALUMNI_TABLE!,
      IndexName: 'stats-index',
      KeyConditionExpression: 'gsi1pk = :pk',
      ExpressionAttributeValues: marshall({
        ':pk': 'STATS'
      })
    };

    const userStatsCommand = new QueryCommand(userStatsParams);
    const userStatsResponse = await dynamoDb.send(userStatsCommand);
    
    // Get donation stats
    const donationStatsParams = {
      TableName: process.env.DONATION_TABLE!,
      IndexName: 'stats-index',
      KeyConditionExpression: 'gsi1pk = :pk',
      ExpressionAttributeValues: marshall({
        ':pk': 'DONATION_STATS'
      })
    };

    const donationStatsCommand = new QueryCommand(donationStatsParams);
    const donationStatsResponse = await dynamoDb.send(donationStatsCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        userStats: userStatsResponse.Items?.map(item => unmarshall(item)) || [],
        donationStats: donationStatsResponse.Items?.map(item => unmarshall(item)) || []
      })
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch dashboard statistics' })
    };
  }
};
