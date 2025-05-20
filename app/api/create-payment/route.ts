
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, email, name, metadata } = await req.json();
    
    const response = await fetch('https://api.hydrogenpay.com/api/v1/initialize-payment', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HYDROGENPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        email,
        name,
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/cancel`,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
