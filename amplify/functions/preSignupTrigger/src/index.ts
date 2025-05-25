import { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async (event) => {
  console.log('Pre-signup trigger event:', JSON.stringify(event, null, 2));

  // Get user email from the event
  const { email } = event.request.userAttributes;

  // Example validation: Check if the email domain is allowed
  // This could be customized based on your requirements (e.g., only allowing alumni email domains)
  const validDomains = ['abu.edu.ng', 'alumni.abu.edu.ng', 'gmail.com', 'yahoo.com'];
  const emailDomain = email.split('@')[1];
  
  if (!validDomains.includes(emailDomain)) {
    console.log(`Email domain ${emailDomain} is not allowed`);
    throw new Error(`Email domain ${emailDomain} is not allowed. Please use a valid email.`);
  }

  // Auto-verify email for testing purposes (remove this in production)
  // event.response.autoVerifyEmail = true;
  
  console.log('Pre-signup validation successful');
  return event;
};
