import { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  console.log('Custom message trigger event:', JSON.stringify(event, null, 2));

  // Get event details
  const { codeParameter, userAttributes } = event.request;
  const { email, name } = userAttributes;
  const { triggerSource } = event;

  // Different message types based on the trigger source
  switch (triggerSource) {
    case 'CustomMessage_SignUp':
      event.response.emailSubject = 'Welcome to ABU Alumni Platform - Verify Your Email';
      event.response.emailMessage = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #006633; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; }
              .button { display: inline-block; background-color: #006633; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>ABU Alumni Platform</h1>
              </div>
              <div class="content">
                <h2>Welcome ${name || 'ABU Graduate'}!</h2>
                <p>Thank you for registering with the Ahmadu Bello University Alumni Platform. We're excited to have you join our growing community of graduates.</p>
                <p>Please verify your email address by entering the following code in the verification page:</p>
                <h3 style="text-align: center; letter-spacing: 5px; font-size: 24px;">${codeParameter}</h3>
                <p>This code will expire in 24 hours.</p>
                <p>Once verified, you'll be able to connect with fellow alumni, access exclusive resources, participate in events, and much more.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Ahmadu Bello University Alumni Association. All rights reserved.</p>
                <p>Samaru, Zaria, Kaduna State, Nigeria</p>
              </div>
            </div>
          </body>
        </html>
      `;
      break;

    case 'CustomMessage_ForgotPassword':
      event.response.emailSubject = 'ABU Alumni Platform - Reset Your Password';
      event.response.emailMessage = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #006633; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; }
              .button { display: inline-block; background-color: #006633; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>ABU Alumni Platform</h1>
              </div>
              <div class="content">
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password for the ABU Alumni Platform.</p>
                <p>Please use the following code to reset your password:</p>
                <h3 style="text-align: center; letter-spacing: 5px; font-size: 24px;">${codeParameter}</h3>
                <p>This code will expire in 15 minutes.</p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Ahmadu Bello University Alumni Association. All rights reserved.</p>
                <p>Samaru, Zaria, Kaduna State, Nigeria</p>
              </div>
            </div>
          </body>
        </html>
      `;
      break;

    case 'CustomMessage_AdminCreateUser':
      event.response.emailSubject = 'Welcome to ABU Alumni Platform - Your Temporary Password';
      event.response.emailMessage = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #006633; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; }
              .button { display: inline-block; background-color: #006633; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>ABU Alumni Platform</h1>
              </div>
              <div class="content">
                <h2>Welcome to ABU Alumni Platform!</h2>
                <p>An administrator has created an account for you on the Ahmadu Bello University Alumni Platform.</p>
                <p>Your temporary password is: <strong>${codeParameter}</strong></p>
                <p>You will be asked to change your password when you first log in.</p>
                <p>Click the button below to access the platform:</p>
                <p style="text-align: center;">
                  <a href="https://alumni.abu.edu.ng/login" class="button">Log In Now</a>
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Ahmadu Bello University Alumni Association. All rights reserved.</p>
                <p>Samaru, Zaria, Kaduna State, Nigeria</p>
              </div>
            </div>
          </body>
        </html>
      `;
      break;

    default:
      // No customization needed for other message types
      break;
  }

  return event;
};
