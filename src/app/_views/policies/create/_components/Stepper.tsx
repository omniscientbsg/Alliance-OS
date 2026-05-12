export function Stepper({ steps, currentStep }: { steps: {id: string, name: string}[], currentStep: number }) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="flex items-center">
            {stepIdx < currentStep ? (
              // Completed Step
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            ) : stepIdx === currentStep ? (
              // Current Step
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-900">{step.id}</span>
              </div>
            ) : (
              // Upcoming Step
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center">
                <span className="text-sm text-slate-400">{step.id}</span>
              </div>
            )}
            <p className={`ml-3 text-sm font-medium ${stepIdx <= currentStep ? 'text-slate-900' : 'text-slate-400'}`}>
              {step.name}
            </p>
          </li>
        ))}
      </ol>
    </nav>
  )
}
