import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Search, Plus, Filter, ArrowUpRight, ArrowDownRight, CreditCard, Banknote } from "lucide-react";
import { ReceiptWizard } from './components/ReceiptWizard';
import { PaymentWizard } from './components/PaymentWizard';

export default function FinanceView() {
  const [activeTab, setActiveTab] = useState('receipts');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const transactions = [
    { id: "RCP-2026-00124", date: "2026-05-12", type: "Premium Receipt", reference: "P11/2025/100/5042", amount: "TZS 4,500,000", status: "Reconciled" },
    { id: "PV-2026-00455", date: "2026-05-11", type: "Claim Payment", reference: "C11/100/1002/2026/011500", amount: "TZS 150,000,000", status: "Processed" },
    { id: "RCP-2026-00125", date: "2026-05-11", type: "Broker Commission", reference: "BKR-1002", amount: "TZS 1,200,000", status: "Pending" },
    { id: "JV-2026-00088", date: "2026-05-10", type: "Journal Voucher", reference: "Month-End Accrual", amount: "TZS 45,000,000", status: "Posted" },
  ];

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finance & GL</h1>
            <p className="text-sm text-slate-500 mt-1">Manage general ledger, accounts payable, receivables, and bank reconciliation.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
            >
              New Payment
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Daily Cash Inflow</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">TZS 14.5M</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-emerald/10 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-aos-emerald" />
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Daily Cash Outflow</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">TZS 152.0M</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-rose/10 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-aos-rose" />
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Reconciliations</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">18</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-amber/10 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-aos-amber" />
            </div>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl items-center">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              <button onClick={() => setActiveTab('receipts')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'receipts' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Receipts</button>
              <button onClick={() => setActiveTab('payments')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'payments' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Payments</button>
              <button onClick={() => setActiveTab('journals')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'journals' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Journals</button>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search TXN No, Reference..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
              />
            </div>
          </div>
          <div className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">TXN Number</TableHead>
                  <TableHead className="font-semibold text-slate-600">Date</TableHead>
                  <TableHead className="font-semibold text-slate-600">Transaction Type</TableHead>
                  <TableHead className="font-semibold text-slate-600">Reference</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell className="font-medium text-aos-blue">{txn.id}</TableCell>
                    <TableCell className="text-slate-600">{txn.date}</TableCell>
                    <TableCell className="text-slate-900 font-medium">{txn.type}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{txn.reference}</TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">{txn.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${txn.status === 'Reconciled' || txn.status === 'Posted' || txn.status === 'Processed' ? 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20' : 'bg-aos-amber/10 text-aos-amber border-aos-amber/20'}
                      `}>
                        {txn.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <ReceiptWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      <PaymentWizard
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </>
  );
}
