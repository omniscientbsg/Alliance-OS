import React, { useState } from 'react';
import { Input } from "./input";
import { Label } from "./label";
import { Globe, Languages } from "lucide-react";

interface BilingualFieldProps {
  label: string;
  id: string;
  primaryPlaceholder?: string;
  secondaryPlaceholder?: string;
  primaryLang?: string;
  secondaryLang?: string;
}

export function BilingualField({
  label,
  id,
  primaryPlaceholder = "Enter value...",
  secondaryPlaceholder = "Ingiza thamani...",
  primaryLang = "EN",
  secondaryLang = "SW"
}: BilingualFieldProps) {
  const [activeLang, setActiveLang] = useState<'primary' | 'secondary'>('primary');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${id}-${activeLang}`} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
        <div className="flex bg-slate-100 rounded-md p-0.5 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveLang('primary')}
            className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${
              activeLang === 'primary' 
                ? 'bg-white text-aos-blue shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {primaryLang}
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('secondary')}
            className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${
              activeLang === 'secondary' 
                ? 'bg-white text-aos-emerald shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {secondaryLang}
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {activeLang === 'primary' ? (
            <Globe className="h-4 w-4 text-slate-400" />
          ) : (
            <Languages className="h-4 w-4 text-slate-400" />
          )}
        </div>
        
        {activeLang === 'primary' ? (
          <Input 
            id={`${id}-primary`}
            className="pl-9 border-slate-200 focus:border-aos-blue focus:ring-aos-blue/20" 
            placeholder={primaryPlaceholder}
            dir="ltr"
          />
        ) : (
          <Input 
            id={`${id}-secondary`}
            className="pl-9 border-slate-200 focus:border-aos-emerald focus:ring-aos-emerald/20 bg-emerald-50/30" 
            placeholder={secondaryPlaceholder}
            dir="ltr"
          />
        )}
      </div>
      <p className="text-[10px] text-slate-400 text-right">
        {activeLang === 'primary' ? `Editing ${primaryLang} translation` : `Editing ${secondaryLang} translation`}
      </p>
    </div>
  );
}
