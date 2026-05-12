"use client";

import React from 'react';
import { FileText, Eye, Camera, Calculator, Banknote, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  stage: string;
  status: 'complete' | 'active' | 'pending';
  user?: string;
  date?: string;
  details?: string;
}

interface ClaimTimelineProps {
  claimId?: string;
  events?: TimelineEvent[];
  className?: string;
}

const defaultEvents: TimelineEvent[] = [
  { id: '1', stage: 'FNOL Registered', status: 'complete', user: 'EUGINIA-CL', date: '22/04/2026 10:24', details: 'Claim C11/100/1002/2026/011654 registered for ALBIZIA LIMITED.' },
  { id: '2', stage: 'Entry Complete', status: 'complete', user: 'EUGINIA-CL', date: '22/04/2026 11:00', details: 'All required fields populated. Ready for approval.' },
  { id: '3', stage: 'Approved', status: 'complete', user: 'MANAGER-CL', date: '22/04/2026 14:15', details: 'Claim approved by claims manager.' },
  { id: '4', stage: 'Surveyor Dispatched', status: 'complete', user: 'SYSTEM', date: '22/04/2026 15:00', details: 'James Mwenda dispatched to loss location.' },
  { id: '5', stage: 'Survey Complete', status: 'complete', user: 'JAMES-SV', date: '24/04/2026 09:30', details: '8 photos uploaded. Damage report filed: Front bumper, headlight, bonnet.' },
  { id: '6', stage: 'Assessment', status: 'active', user: 'EUGINIA-CL', date: '25/04/2026', details: 'Estimates being reviewed. Reserve: TZS 4,500,000.' },
  { id: '7', stage: 'Settlement', status: 'pending' },
  { id: '8', stage: 'Payment', status: 'pending' },
  { id: '9', stage: 'Closed', status: 'pending' },
];

const stageIcons: Record<string, React.ReactNode> = {
  'FNOL Registered': <FileText className="w-4 h-4" />,
  'Entry Complete': <CheckCircle2 className="w-4 h-4" />,
  'Approved': <CheckCircle2 className="w-4 h-4" />,
  'Surveyor Dispatched': <Camera className="w-4 h-4" />,
  'Survey Complete': <Camera className="w-4 h-4" />,
  'Assessment': <Calculator className="w-4 h-4" />,
  'Settlement': <Banknote className="w-4 h-4" />,
  'Payment': <Banknote className="w-4 h-4" />,
  'Closed': <XCircle className="w-4 h-4" />,
};

export function ClaimTimeline({ events = defaultEvents, className = '' }: ClaimTimelineProps) {
  return (
    <div className={`${className}`}>
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Claim Lifecycle</h4>
      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200" />
        <div className="space-y-4">
          {events.map((event) => {
            const statusClasses = event.status === 'complete'
              ? 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20'
              : event.status === 'active'
              ? 'bg-aos-blue/10 text-aos-blue border-aos-blue/20 ring-2 ring-aos-blue/20'
              : 'bg-slate-50 text-slate-400 border-slate-200';
            return (
              <div key={event.id} className="relative flex items-start gap-3">
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${statusClasses}`}>
                  {event.status === 'pending' ? <Clock className="w-3.5 h-3.5" /> : stageIcons[event.stage] || <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${event.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{event.stage}</span>
                    {event.status === 'active' && <span className="text-[9px] px-1.5 py-0.5 bg-aos-blue text-white rounded-full font-bold animate-pulse">CURRENT</span>}
                  </div>
                  {event.user && <p className="text-xs text-slate-500 mt-0.5">{event.user} • {event.date}</p>}
                  {event.details && <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded border border-slate-100">{event.details}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
