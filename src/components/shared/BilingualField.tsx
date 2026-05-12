"use client";

import React from 'react';
import { Globe } from 'lucide-react';

interface BilingualFieldProps {
  label: string;
  value?: string;
  valueBl?: string;
  onChange?: (val: string) => void;
  onBlChange?: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function BilingualField({
  label,
  value = '',
  valueBl = '',
  onChange,
  onBlChange,
  placeholder = '',
  readOnly = false,
  className = '',
}: BilingualFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none"
        />
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          <Globe className="w-3 h-3" />
          {label} (BL — Bilingual)
        </label>
        <input
          type="text"
          value={valueBl}
          onChange={(e) => onBlChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={`${placeholder} (Swahili)`}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none"
        />
      </div>
    </div>
  );
}
