import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Upload, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export function BankReconciliationPanel() {
  const [activeBank, setActiveBank] = useState('CRDB');

  const statements = [
    { id: "STMT-001", date: "14 May 2026", desc: "Incoming Transfer - Acme Corp", amount: "4,500,000", type: "Credit", status: "Matched" },
    { id: "STMT-002", date: "14 May 2026", desc: "Cheque Deposit #99482", amount: "1,200,000", type: "Credit", status: "Unmatched" },
    { id: "STMT-003", date: "13 May 2026", desc: "Outgoing RTGS - Claim Payment", amount: "15,000,000", type: "Debit", status: "Matched" },
    { id: "STMT-004", date: "12 May 2026", desc: "Bank Charges", amount: "25,000", type: "Debit", status: "Unmatched" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setActiveBank('CRDB')} className={`px-4 py-3 min-w-[200px] border rounded-xl flex items-center gap-3 transition-colors ${activeBank === 'CRDB' ? 'bg-aos-blue/5 border-aos-blue' : 'bg-white border-slate-200 hover:border-aos-blue/30'}`}>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-blue-600" /></div>
          <div className="text-left"><p className="text-sm font-bold text-slate-900">CRDB Bank</p><p className="text-xs text-slate-500">Premium Acc</p></div>
        </button>
        <button onClick={() => setActiveBank('NMB')} className={`px-4 py-3 min-w-[200px] border rounded-xl flex items-center gap-3 transition-colors ${activeBank === 'NMB' ? 'bg-aos-blue/5 border-aos-blue' : 'bg-white border-slate-200 hover:border-aos-blue/30'}`}>
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-indigo-600" /></div>
          <div className="text-left"><p className="text-sm font-bold text-slate-900">NMB Bank</p><p className="text-xs text-slate-500">Claims Acc</p></div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 shadow-sm bg-slate-50 border-dashed flex flex-col justify-center items-center text-center">
          <Upload className="w-8 h-8 text-slate-400 mb-2" />
          <h3 className="font-semibold text-slate-900">Upload Statement (MT940/CSV)</h3>
          <button className="mt-3 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors shadow-sm">Select File</button>
        </Card>
        <Card className="p-4 border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">GL Balance (System)</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">TZS 1,452.8M</h3>
          <p className="text-xs text-slate-500 mt-2">As of 14 May 2026</p>
        </Card>
        <Card className="p-4 border-slate-200 shadow-sm bg-aos-emerald/5 border-aos-emerald/20">
          <p className="text-sm font-medium text-aos-emerald">Bank Statement Balance</p>
          <h3 className="text-2xl font-bold text-aos-emerald mt-1">TZS 1,452.8M</h3>
          <p className="text-xs text-aos-emerald/80 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Reconciled</p>
        </Card>
      </div>

      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="text-sm text-slate-600 font-medium">Unmatched Items: <strong className="text-aos-rose">2</strong></div>
        <button className="px-3 py-1.5 bg-aos-blue text-white rounded text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Run Auto-Match Engine
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Date</TableHead>
              <TableHead className="font-semibold text-slate-600">Description</TableHead>
              <TableHead className="font-semibold text-slate-600">Type</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">Amount (TZS)</TableHead>
              <TableHead className="font-semibold text-slate-600">Recon Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statements.map((stmt) => (
              <TableRow key={stmt.id} className="hover:bg-slate-50/50">
                <TableCell className="text-slate-600 text-sm">{stmt.date}</TableCell>
                <TableCell className="font-medium text-slate-900">{stmt.desc}</TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${stmt.type === 'Credit' ? 'text-aos-emerald' : 'text-aos-rose'}`}>{stmt.type}</span>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900">{stmt.amount}</TableCell>
                <TableCell>
                  {stmt.status === 'Matched' ? (
                    <span className="inline-flex items-center gap-1.5 text-aos-emerald text-sm font-medium bg-aos-emerald/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Matched
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-aos-amber text-sm font-medium bg-aos-amber/10 px-2.5 py-0.5 rounded-full">
                      <AlertCircle className="w-3 h-3" /> Unmatched
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {stmt.status === 'Unmatched' && (
                    <button className="text-aos-blue text-xs font-medium hover:underline">Manual Match</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
