"use client";

import React from 'react';
import { CalendarDays } from 'lucide-react';

interface EffectiveDateRangeProps {
  fromDate?: string;
  toDate?: string;
  onFromChange?: (val: string) => void;
  onToChange?: (val: string) => void;
  readOnly?: boolean;
  className?: string;
}

export function EffectiveDateRange({
  fromDate = '',
  toDate = '',
  onFromChange,
  onToChange,
  readOnly = false,
  className = '',
}: EffectiveDateRangeProps) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <div className="flex-1">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Effective From</label>
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromChange?.(e.target.value)}
            readOnly={readOnly}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none disabled:bg-slate-100 dark:disabled:bg-slate-900"
          />
        </div>
      </div>
      <span className="text-slate-400 pb-2.5 text-sm">→</span>
      <div className="flex-1">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Effective To</label>
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToChange?.(e.target.value)}
            readOnly={readOnly}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none disabled:bg-slate-100 dark:disabled:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
