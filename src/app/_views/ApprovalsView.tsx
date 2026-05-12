import React from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Search, Clock } from "lucide-react";

export default function ApprovalsView() {
  const approvals = [
    { id: "APP-001", type: "Claim Settlement", reference: "C11/100/1002", amount: "TZS 45,000,000", requestedBy: "Jane Underwriter", date: "2 Hours ago" },
    { id: "APP-002", type: "Policy Discount Override", reference: "P11/2025/100", amount: "15% Discount", requestedBy: "Mike Sales", date: "5 Hours ago" },
    { id: "APP-003", type: "Payment Voucher", reference: "PV-2026-00455", amount: "TZS 12,000,000", requestedBy: "Finance Dept", date: "1 Day ago" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Managerial Approvals</h1>
          <p className="text-sm text-slate-500 mt-1">Review and action pending requests requiring elevated authorization.</p>
        </div>
      </div>

      <div className="space-y-4">
        {approvals.map((req) => (
          <Card key={req.id} className="p-5 border-slate-200 shadow-sm bg-white hover:border-aos-blue/30 transition-colors group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-full shrink-0 group-hover:bg-aos-blue/5 transition-colors">
                  <Clock className="w-5 h-5 text-aos-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{req.type}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                    <span>Ref: <span className="font-medium text-slate-700">{req.reference}</span></span>
                    <span>•</span>
                    <span>Requested by: <span className="font-medium text-slate-700">{req.requestedBy}</span></span>
                    <span>•</span>
                    <span>{req.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-right px-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Value</p>
                  <p className="text-base font-bold text-slate-900">{req.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-200 text-slate-400 hover:text-aos-rose hover:bg-aos-rose/5 rounded-lg transition-colors bg-white">
                    <XCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-slate-200 text-slate-400 hover:text-aos-emerald hover:bg-aos-emerald/5 rounded-lg transition-colors bg-white">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {approvals.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <CheckCircle className="w-10 h-10 text-aos-emerald mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-medium text-slate-900">All caught up!</h3>
            <p className="text-slate-500 text-sm">You have no pending approvals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
