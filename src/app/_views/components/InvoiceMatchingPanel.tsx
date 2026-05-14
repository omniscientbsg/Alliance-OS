import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileCheck, Search, Link as LinkIcon, SplitSquareHorizontal } from "lucide-react";

export function InvoiceMatchingPanel() {
  const brokers = [
    { name: "Marsh Brokers Tanzania", pendingComm: "TZS 12,500,000", unmatched: 4 },
    { name: "Aon Tanzania", pendingComm: "TZS 8,200,000", unmatched: 2 },
    { name: "Jardine Lloyd Thompson", pendingComm: "TZS 3,450,000", unmatched: 1 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Broker Invoice Matching</h2>
          <p className="text-sm text-slate-500">Match broker commission invoices against settled premium receipts.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <SplitSquareHorizontal className="w-4 h-4" /> Split Commission
          </button>
          <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm flex items-center gap-2">
            <LinkIcon className="w-4 h-4" /> Auto-Match
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Broker List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Broker..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
            />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
            {brokers.map((broker, idx) => (
              <button key={idx} className="p-4 border-b border-slate-100 text-left hover:bg-slate-50 transition-colors focus:bg-aos-blue/5 focus:border-l-4 focus:border-l-aos-blue outline-none last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{broker.name}</h3>
                  <span className="bg-aos-amber/10 text-aos-amber text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{broker.unmatched} Items</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Pending: <span className="text-slate-900">{broker.pendingComm}</span></p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Matching Interface */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2"><FileCheck className="w-4 h-4 text-aos-blue" /> Unmatched Invoices - Marsh Brokers</h3>
            </div>
            <Table>
              <TableHeader className="bg-white border-b border-slate-100">
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-aos-blue focus:ring-aos-blue" />
                  </TableHead>
                  <TableHead className="font-semibold text-slate-600">Invoice No</TableHead>
                  <TableHead className="font-semibold text-slate-600">Policy Ref</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Invoice Amt</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-aos-blue focus:ring-aos-blue" defaultChecked />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 text-sm">INV-2026-001</TableCell>
                  <TableCell className="text-slate-600 text-sm">P11/2025/100/5042</TableCell>
                  <TableCell className="text-right font-medium text-slate-900">TZS 675,000</TableCell>
                  <TableCell><span className="text-xs font-bold text-aos-emerald">Receipt Matched</span></TableCell>
                </TableRow>
                <TableRow className="hover:bg-slate-50/50 bg-aos-blue/5">
                  <TableCell className="text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-aos-blue focus:ring-aos-blue" />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 text-sm">INV-2026-004</TableCell>
                  <TableCell className="text-slate-600 text-sm">P11/2025/100/5020</TableCell>
                  <TableCell className="text-right font-medium text-slate-900">TZS 300,000</TableCell>
                  <TableCell><span className="text-xs font-bold text-aos-amber">Pending Receipt</span></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="p-4 bg-slate-50 flex justify-between items-center border-t border-slate-100">
              <p className="text-sm font-medium text-slate-600">1 Item Selected</p>
              <div className="flex gap-4 items-center">
                <p className="text-sm font-bold text-slate-900">Total: TZS 675,000</p>
                <button className="px-4 py-2 bg-aos-emerald text-white rounded-lg text-sm font-medium hover:bg-aos-emerald/90 transition-colors shadow-sm">Process Payment</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
