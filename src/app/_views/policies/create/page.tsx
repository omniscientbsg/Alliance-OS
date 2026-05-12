"use client";

import { useState } from "react";
import { ClientDetailsStep } from "./_components/ClientDetailsStep";
import { RiskInformationStep } from "./_components/RiskInformationStep";
import { CoveragesStep } from "./_components/CoveragesStep";
import { ReviewStep } from "./_components/ReviewStep";
import { Stepper } from "./_components/Stepper";

const steps = [
  { id: "01", name: "Client Details" },
  { id: "02", name: "Risk Information" },
  { id: "03", name: "Coverages" },
  { id: "04", name: "Review & Bind" },
];

export default function CreatePolicyPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const StepContent = () => {
    switch(currentStep) {
      case 0:
        return <ClientDetailsStep />;
      case 1:
        return <RiskInformationStep />;
      case 2:
        return <CoveragesStep />;
      case 3:
        return <ReviewStep />;
      default:
        return null;
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create New Policy</h1>
      <p className="text-slate-500 mb-8">Follow the steps to issue a new policy.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="col-span-3">
          <StepContent />
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-slate-900 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
