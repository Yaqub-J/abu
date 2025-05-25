import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SESClient, SendBulkTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { recipients, template, subject } = JSON.parse(event.body || '{}');

    // Send email notifications via SES
    const ses = new SESClient({});
    const sesCommand = new SendBulkTemplatedEmailCommand({
      Source: process.env.NOTIFICATION_EMAIL!,
      Template: template,
      DefaultTemplateData: '{}',
      Destinations: recipients.map(recipient => ({
        Destination: {
          ToAddresses: [recipient.email]
        },
        ReplacementTemplateData: JSON.stringify({
          name: recipient.name,
          message: recipient.message
        })
      }))
    });

    const sesResponse = await ses.send(sesCommand);

    // Send push notifications via SNS
    const sns = new SNSClient({});
    const snsCommand = new PublishCommand({
      TopicArn: process.env.NOTIFICATION_TOPIC_ARN!,
      Message: JSON.stringify({
        default: 'New notification',
        GCM: JSON.stringify({
          notification: {
            title: subject,
            body: 'You have a new notification'
          }
        })
      }),
      MessageStructure: 'json'
    });

    const snsResponse = await sns.send(snsCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        emailResponse: sesResponse,
        pushResponse: snsResponse
      })
    };
  } catch (error) {
    console.error('Error sending notifications:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notifications' })
    };
  }
};
