import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Extract payment details from the request
    const { amount, customerName, email, currency, description, meta } = await req.json();
    
    // Call the Hydrogenpay API
    const response = await fetch('https://api.hydrogenpay.com/bepay/api/v1/merchant/initiate-payment', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer PK_TEST_8d464b0df336b6cb4820b2cc8a319953',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        customerName,
        email,
        currency: currency || 'NGN',
        description,
        meta,
        callback: process.env.NEXT_PUBLIC_APP_URL || 'https://hydrogenpay.com',
      }),
    });

    // Parse and return the API response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Hydrogen Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
