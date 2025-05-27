import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Extract payment details from the request
    const { 
      amount, 
      customerName, 
      email, 
      currency, 
      description, 
      meta, 
      frequency, 
      isRecurring 
    } = await req.json();
    
    // Get the callback URL (ideally from environment variables)
    const callbackUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/donations/thank-you` 
      : 'https://hydrogenpay.com';
    
    // Prepare the request body
    const requestBody: any = {
      amount,
      customerName,
      email,
      currency: currency || 'NGN',
      description: description || 'Donation to ABU',
      meta,
      callback: callbackUrl,
    };
    
    // Add recurring payment parameters if this is a recurring payment
    if (isRecurring) {
      // Map frequency string to Hydrogen's numeric format
      // 0 - Daily, 1 - Weekly, 2 - Monthly, 3 - Quarterly, 4 - Yearly, 5 - Disable auto debit
      let frequencyValue = '2'; // Default to monthly (2)
      
      switch (frequency) {
        case 'daily':
          frequencyValue = '0';
          break;
        case 'weekly':
          frequencyValue = '1';
          break;
        case 'monthly':
          frequencyValue = '2';
          break;
        case 'quarterly':
          frequencyValue = '3';
          break;
        case 'yearly':
          frequencyValue = '4';
          break;
        case 'disable':
          frequencyValue = '5';
          break;
      }
      
      // Calculate end date (1 year from now by default)
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      
      // Add recurring payment parameters
      requestBody.frequency = frequencyValue;
      requestBody.isRecurring = true;
      requestBody.endDate = endDate.toISOString();
    }
    
    // Call the Hydrogenpay API
    const response = await fetch('https://api.hydrogenpay.com/bepay/api/v1/merchant/initiate-payment', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HYDROGEN_PAY_API_KEY || 'PK_TEST_8d464b0df336b6cb4820b2cc8a319953'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the API response
    const data = await response.json();
    
    // Check for success response
    if (data.statusCode === '90000' && data.data && data.data.url) {
      // Format the response for our frontend
      return NextResponse.json({
        success: true,
        message: data.message,
        transactionRef: data.data.transactionRef,
        redirectUrl: data.data.url,
        paymentUrl: data.data.url, // Adding this for compatibility
        isRecurring: isRecurring || false
      });
    } else {
      // Handle error response
      return NextResponse.json(
        { 
          success: false,
          error: data.message || 'Payment initiation failed',
          statusCode: data.statusCode
        },
        { status: data.statusCode === 400 ? 400 : 500 }
      );
    }
  } catch (error) {
    console.error('Hydrogen Payment initiation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
