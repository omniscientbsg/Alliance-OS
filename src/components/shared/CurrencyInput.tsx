"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface CurrencyInputProps {
  currencyCode?: string;
  exchangeRateType?: 'Buying' | 'Selling';
  rate?: number;
  fcValue?: number;
  lcValue?: number;
  onFcChange?: (val: number) => void;
  onLcChange?: (val: number) => void;
  label?: string;
  readOnly?: boolean;
}

export function CurrencyInput({
  currencyCode = 'USD',
  exchangeRateType = 'Buying',
  rate = 2300.00,
  fcValue: initialFc = 0,
  lcValue: initialLc = 0,
  onFcChange,
  onLcChange,
  label = 'Amount',
  readOnly = false,
}: CurrencyInputProps) {
  const [fc, setFc] = useState(initialFc);
  const [lc, setLc] = useState(initialLc || initialFc * rate);

  useEffect(() => {
    setLc(parseFloat((fc * rate).toFixed(2)));
  }, [fc, rate]);

  const handleFcChange = (val: number) => {
    setFc(val);
    onFcChange?.(val);
    const computed = parseFloat((val * rate).toFixed(2));
    setLc(computed);
    onLcChange?.(computed);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="flex items-center gap-3">
        {/* FC Amount */}
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">{currencyCode}</span>
            <input
              type="number"
              value={fc || ''}
              onChange={(e) => handleFcChange(parseFloat(e.target.value) || 0)}
              readOnly={readOnly}
              className="w-full pl-12 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-right font-medium focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none disabled:bg-slate-100 dark:disabled:bg-slate-900"
              placeholder="0.00"
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">FC Amount ({currencyCode})</span>
        </div>

        {/* Exchange Rate Indicator */}
        <div className="flex flex-col items-center shrink-0 pt-1">
          <ArrowRightLeft className="w-4 h-4 text-slate-400" />
          <span className="text-[9px] text-slate-400 mt-0.5">{exchangeRateType}</span>
          <span className="text-[10px] font-mono font-bold text-aos-blue">{rate.toLocaleString()}</span>
        </div>

        {/* LC Amount */}
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">TZS</span>
            <input
              type="number"
              value={lc || ''}
              readOnly
              className="w-full pl-12 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-right font-medium text-slate-600 dark:text-slate-400 outline-none"
              placeholder="0.00"
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">LC Amount (TZS)</span>
        </div>
      </div>
    </div>
  );
}
