"use client";

import React from 'react';
import { CheckCircle2, Clock, XCircle, Send, Edit3, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ApprovalEvent {
  id: string;
  user: string;
  action: 'created' | 'submitted' | 'approved' | 'rejected' | 'amended' | 'reversed' | 'generated';
  timestamp: string;
  details?: string;
  role?: string;
}

interface ApprovalTimelineProps {
  events: ApprovalEvent[];
  className?: string;
}

const actionConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  created:   { icon: <Edit3 className="w-3.5 h-3.5" />,        color: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700', label: 'Created' },
  submitted: { icon: <Send className="w-3.5 h-3.5" />,         color: 'bg-aos-blue/10 text-aos-blue border-aos-blue/20',       label: 'Submitted for Approval' },
  approved:  { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20', label: 'Approved' },
  rejected:  { icon: <XCircle className="w-3.5 h-3.5" />,      color: 'bg-aos-rose/10 text-aos-rose border-aos-rose/20',       label: 'Rejected' },
  amended:   { icon: <AlertTriangle className="w-3.5 h-3.5" />,color: 'bg-aos-amber/10 text-aos-amber border-aos-amber/20',     label: 'Amended' },
  reversed:  { icon: <XCircle className="w-3.5 h-3.5" />,      color: 'bg-aos-rose/10 text-aos-rose border-aos-rose/20',       label: 'Reversed' },
  generated: { icon: <ShieldCheck className="w-3.5 h-3.5" />,  color: 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20', label: 'Generated' },
};

export function ApprovalTimeline({ events, className = '' }: ApprovalTimelineProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Approval Timeline</h4>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-4">
          {events.map((event, idx) => {
            const config = actionConfig[event.action] || actionConfig.created;
            return (
              <div key={event.id} className="relative flex items-start gap-3 pl-0">
                {/* Icon dot */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${config.color}`}>
                  {config.icon}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{config.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">by {event.user}</span>
                    {event.role && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">{event.role}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{event.timestamp}</p>
                  {event.details && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-700">{event.details}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
