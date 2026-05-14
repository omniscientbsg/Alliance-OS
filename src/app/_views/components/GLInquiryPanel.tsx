import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter, BookOpen } from "lucide-react";

export function GLInquiryPanel() {
  const accounts = [
    { code: "1001", name: "Main Premium Bank Account", type: "Asset", balance: "TZS 1,452,800,000" },
    { code: "4001", name: "Premium Receivable - Direct", type: "Asset", balance: "TZS 450,000,000" },
    { code: "5001", name: "Broker Commission Expense", type: "Expense", balance: "TZS 85,000,000" },
    { code: "7001", name: "Gross Written Premium", type: "Income", balance: "TZS 3,250,000,000" },
    { code: "2001", name: "Outstanding Claims Reserve", type: "Liability", balance: "TZS 850,000,000" },
  ];

  const transactions = [
    { date: "14 May 2026", ref: "RCP-2026-00124", desc: "Premium Receipt P11/2025/100/5042", debit: "4,500,000", credit: "-", balance: "TZS 1,452,800,000" },
    { date: "12 May 2026", ref: "PV-2026-00455", desc: "Claim Payment C11/100/1002/2026", debit: "-", credit: "150,000,000", balance: "TZS 1,448,300,000" },
    { date: "10 May 2026", ref: "RCP-2026-00122", desc: "Premium Receipt P11/2025/100/5020", debit: "2,000,000", credit: "-", balance: "TZS 1,598,300,000" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Sidebar - Account Selector */}
        <div className="col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Account Code..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
            />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-h-[600px] overflow-y-auto">
            {accounts.map(acc => (
              <button key={acc.code} className="w-full text-left p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors focus:bg-aos-blue/5 focus:border-l-4 focus:border-l-aos-blue outline-none group">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-aos-blue group-focus:text-aos-blue/80">{acc.code}</p>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{acc.type}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1 truncate">{acc.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Ledger Details */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <Card className="p-5 border-slate-200 shadow-sm flex justify-between items-center bg-gradient-to-r from-aos-blue/5 to-transparent border-l-4 border-l-aos-blue">
            <div>
              <p className="text-sm font-bold text-aos-blue mb-1">1001 - Main Premium Bank Account</p>
              <h2 className="text-2xl font-bold text-slate-900">TZS 1,452,800,000 <span className="text-sm font-medium text-slate-500 font-normal tracking-normal ml-1">Dr</span></h2>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </Card>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2"><BookOpen className="w-4 h-4 text-aos-blue" /> Ledger Transactions</h3>
              <p className="text-xs text-slate-500">Showing 1 May 2026 - 14 May 2026</p>
            </div>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Date</TableHead>
                  <TableHead className="font-semibold text-slate-600">Reference</TableHead>
                  <TableHead className="font-semibold text-slate-600">Description</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Debit (TZS)</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Credit (TZS)</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Running Bal.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-slate-50/50 font-medium">
                  <TableCell colSpan={5} className="text-right text-slate-600">Opening Balance</TableCell>
                  <TableCell className="text-right text-slate-900">TZS 1,596,300,000</TableCell>
                </TableRow>
                {transactions.map((txn, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/50">
                    <TableCell className="text-slate-600 text-sm whitespace-nowrap">{txn.date}</TableCell>
                    <TableCell className="font-medium text-aos-blue text-sm whitespace-nowrap hover:underline cursor-pointer">{txn.ref}</TableCell>
                    <TableCell className="text-slate-900 text-sm">{txn.desc}</TableCell>
                    <TableCell className="text-right font-medium text-slate-900">{txn.debit}</TableCell>
                    <TableCell className="text-right font-medium text-slate-900">{txn.credit}</TableCell>
                    <TableCell className="text-right font-bold text-slate-900 bg-slate-50/30">{txn.balance}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-200">
                  <TableCell colSpan={3} className="text-right text-slate-700">Closing Balance (As of 14 May 2026)</TableCell>
                  <TableCell className="text-right text-slate-900">6,500,000</TableCell>
                  <TableCell className="text-right text-slate-900">150,000,000</TableCell>
                  <TableCell className="text-right text-aos-blue">TZS 1,452,800,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
