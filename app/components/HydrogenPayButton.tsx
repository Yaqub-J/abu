'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentProps {
  amount: number;
  customerName: string;
  email: string;
  currency?: string;
  description?: string;
  meta?: string;
  frequency?: string;
  isRecurring?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export default function HydrogenPayButton({
  amount,
  customerName,
  email,
  currency = 'NGN',
  description = 'Payment for services',
  meta = '',
  frequency = 'monthly',
  isRecurring = false,
  buttonText = 'Pay Now',
  buttonClassName = 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
  onSuccess,
  onError
}: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/hydrogen-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerName,
          email,
          currency,
          description,
          meta,
          frequency,
          isRecurring,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }
      
      // Handle success
      if (data.redirectUrl || data.paymentUrl) {
        // Redirect to payment page
        window.location.href = data.redirectUrl || data.paymentUrl;
      } else if (onSuccess) {
        onSuccess(data);
      }
      
      console.log('Payment initiated successfully:', data);
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={buttonClassName}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
}
