"use client";

import React from 'react';
import { CheckCircle2, Clock, Send, FileEdit, ShieldCheck, XCircle, RotateCcw, FileText } from 'lucide-react';

type Status = 'draft' | 'pending_approval' | 'approved' | 'generated' | 'rejected' | 'reversed' | 'closed' | 'active' | 'expired' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<Status, { icon: React.ReactNode; label: string; classes: string }> = {
  draft:            { icon: <FileEdit className="w-3 h-3" />,       label: 'Draft',              classes: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  pending_approval: { icon: <Clock className="w-3 h-3" />,          label: 'Pending Approval',   classes: 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' },
  approved:         { icon: <CheckCircle2 className="w-3 h-3" />,   label: 'Approved',           classes: 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20' },
  generated:        { icon: <ShieldCheck className="w-3 h-3" />,    label: 'Generated',          classes: 'bg-aos-blue/10 text-aos-blue border-aos-blue/20' },
  rejected:         { icon: <XCircle className="w-3 h-3" />,        label: 'Rejected',           classes: 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' },
  reversed:         { icon: <RotateCcw className="w-3 h-3" />,      label: 'Reversed',           classes: 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' },
  closed:           { icon: <CheckCircle2 className="w-3 h-3" />,   label: 'Closed',             classes: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  active:           { icon: <CheckCircle2 className="w-3 h-3" />,   label: 'Active',             classes: 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20' },
  expired:          { icon: <Clock className="w-3 h-3" />,          label: 'Expired',            classes: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  cancelled:        { icon: <XCircle className="w-3 h-3" />,        label: 'Cancelled',          classes: 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' },
};

export function StatusBadge({ status, size = 'sm', className = '' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const sizeClasses = size === 'md' ? 'px-3 py-1.5 text-xs' : 'px-2 py-0.5 text-[10px]';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${config.classes} ${sizeClasses} ${className}`}>
      {config.icon}
      {config.label}
    </span>
  );
}
