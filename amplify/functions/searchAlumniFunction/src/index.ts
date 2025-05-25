import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDBClient({});
    const { query } = JSON.parse(event.body || '{}');

    const params = {
      TableName: process.env.ALUMNI_TABLE!,
      IndexName: 'search-index',
      KeyConditionExpression: 'gsi1pk = :pk',
      FilterExpression: 'contains(#name, :query) OR contains(#department, :query) OR contains(#year, :query)',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#department': 'department',
        '#year': 'graduationYear'
      },
      ExpressionAttributeValues: {
        ':pk': 'ALUMNI',
        ':query': query.toLowerCase()
      }
    };

    const command = new QueryCommand(params);
    const response = await dynamoDb.send(command);

    const items = response.Items?.map((item: any) => unmarshall(item)) || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ items })
    };
  } catch (error) {
    console.error('Error searching alumni:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to search alumni' })
    };
  }
};
