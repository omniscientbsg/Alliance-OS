"use client";

import React from 'react';
import { AlertTriangle, ShieldAlert, TrendingUp, Clock, FileWarning, Car } from 'lucide-react';

interface FraudScoreCardProps {
  score: 'Low' | 'Medium' | 'High';
  reasons?: string[];
  claimId?: string;
  className?: string;
}

export function FraudScoreCard({
  score = 'Medium',
  reasons = [
    '3 claims on same policy in last 12 months',
    'Loss amount is 92% of cover limit',
    'Claim filed within 30 days of policy inception',
    'Similar vehicle damage pattern to flagged claim C11/100/1002/2025/010892',
  ],
  claimId = 'C11/100/1002/2026/011702',
  className = '',
}: FraudScoreCardProps) {
  const scoreConfig = {
    Low:    { color: 'text-aos-emerald', bg: 'bg-aos-emerald/10', border: 'border-aos-emerald/20', gauge: 25 },
    Medium: { color: 'text-aos-amber',   bg: 'bg-aos-amber/10',   border: 'border-aos-amber/20',   gauge: 55 },
    High:   { color: 'text-aos-rose',    bg: 'bg-aos-rose/10',    border: 'border-aos-rose/20',    gauge: 85 },
  };

  const config = scoreConfig[score];

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${config.color}`} />
          <h4 className="text-sm font-bold text-slate-900">AI Fraud Score</h4>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${config.color} ${config.bg} ${config.border}`}>
          {score} Risk
        </span>
      </div>

      {/* Gauge */}
      <div className="space-y-1">
        <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${score === 'High' ? 'bg-aos-rose' : score === 'Medium' ? 'bg-aos-amber' : 'bg-aos-emerald'}`}
            style={{ width: `${config.gauge}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>Low</span><span>Medium</span><span>High</span>
        </div>
      </div>

      {/* Reasons */}
      <div className="space-y-2">
        <h5 className="text-xs font-semibold text-slate-700">Risk Indicators</h5>
        {reasons.map((reason, i) => (
          <div key={i} className="flex items-start gap-2">
            <AlertTriangle className={`w-3 h-3 mt-0.5 shrink-0 ${config.color}`} />
            <p className="text-xs text-slate-700">{reason}</p>
          </div>
        ))}
      </div>

      {/* Action */}
      {score !== 'Low' && (
        <button className={`w-full py-2 text-xs font-bold rounded-lg border ${config.border} ${config.color} hover:bg-white/50 transition-colors`}>
          Flag for Investigation
        </button>
      )}
    </div>
  );
}
