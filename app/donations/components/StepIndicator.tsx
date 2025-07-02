import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  /*
  * OLD PAYMENT STEPS
  */
  // const steps = [
  //   { number: 1, label: 'USER DETAILS' },
  //   { number: 2, label: 'PAYMENT METHOD' },
  //   { number: 3, label: 'CONFIRMATION' },
  // ];

  /*
  * NEW PAYMENT STEPS
  */
 const steps = [
    { number: 1, label: 'USER DETAILS' },
    { number: 2, label: 'CONFIRMATION' },
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute h-0.5 bg-gray-200 top-1/2 w-full -translate-y-3 z-0"></div>
        
        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center relative z-10">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg mb-2
                ${currentStep >= step.number ? 'bg-green-600' : 'bg-gray-300'}`}
            >
              {step.number}
            </div>
            <div className={`text-xs font-medium ${currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'}`}>
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
