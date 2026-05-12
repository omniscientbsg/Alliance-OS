"use client";

import React from 'react';
import { User, CalendarDays } from 'lucide-react';

interface AuditStampProps {
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  className?: string;
}

export function AuditStamp({
  createdBy = 'SYSTEM',
  createdDate = '',
  modifiedBy,
  modifiedDate,
  className = '',
}: AuditStampProps) {
  return (
    <div className={`flex items-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 mt-4 ${className}`}>
      <div className="flex items-center gap-1">
        <User className="w-3 h-3" />
        <span>Created: <span className="font-medium text-slate-500 dark:text-slate-400">{createdBy}</span></span>
      </div>
      {createdDate && (
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          <span>{createdDate}</span>
        </div>
      )}
      {modifiedBy && (
        <>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Modified: <span className="font-medium text-slate-500 dark:text-slate-400">{modifiedBy}</span></span>
          </div>
          {modifiedDate && (
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <span>{modifiedDate}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
