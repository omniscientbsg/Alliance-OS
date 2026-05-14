import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Search, Filter, FileText, Shield, Briefcase, FileCheck, Eye } from "lucide-react";

export default function ApprovalsView() {
  const [activeCategory, setActiveCategory] = useState('all');

  const pendingApprovals = [
    { id: "APP-2026-001", type: "Claim Payment", ref: "C11/100/1002/2026/011654", maker: "J. Doe", amount: "TZS 15,400,000", date: "2026-05-14", status: "Pending", category: "claims" },
    { id: "APP-2026-002", type: "Policy Discount", ref: "P11/2026/100/5042", maker: "S. Smith", amount: "15% (TZS 450,000)", date: "2026-05-14", status: "Pending", category: "underwriting" },
    { id: "APP-2026-003", type: "Journal Voucher", ref: "JV-2026-05-089", maker: "A. Finance", amount: "TZS 2,500,000", date: "2026-05-13", status: "Pending", category: "finance" },
    { id: "APP-2026-004", type: "Treaty Setup", ref: "XOL-2026-MOTOR", maker: "R. Insurance", amount: "N/A", date: "2026-05-12", status: "Pending", category: "reinsurance" },
  ];

  const filteredApprovals = activeCategory === 'all' ? pendingApprovals : pendingApprovals.filter(a => a.category === activeCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maker-Checker Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Review and approve pending system transactions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setActiveCategory('all')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeCategory === 'all' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>All Pending</button>
            <button onClick={() => setActiveCategory('underwriting')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeCategory === 'underwriting' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Underwriting</button>
            <button onClick={() => setActiveCategory('claims')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeCategory === 'claims' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Claims</button>
            <button onClick={() => setActiveCategory('finance')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeCategory === 'finance' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Finance</button>
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Reference..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
            />
          </div>
        </div>
        
        <div className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600 py-3">Task ID</TableHead>
                <TableHead className="font-semibold text-slate-600">Type</TableHead>
                <TableHead className="font-semibold text-slate-600">Reference</TableHead>
                <TableHead className="font-semibold text-slate-600">Maker</TableHead>
                <TableHead className="font-semibold text-slate-600">Value/Amount</TableHead>
                <TableHead className="font-semibold text-slate-600">Submitted</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => (
                <TableRow key={approval.id} className="hover:bg-slate-50/50 group">
                  <TableCell className="font-medium text-slate-900">{approval.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {approval.category === 'underwriting' && <Shield className="w-4 h-4 text-aos-blue" />}
                      {approval.category === 'claims' && <FileText className="w-4 h-4 text-aos-rose" />}
                      {approval.category === 'finance' && <Briefcase className="w-4 h-4 text-aos-emerald" />}
                      {approval.category === 'reinsurance' && <FileCheck className="w-4 h-4 text-aos-purple" />}
                      <span className="text-sm text-slate-700">{approval.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-aos-blue cursor-pointer hover:underline">{approval.ref}</TableCell>
                  <TableCell className="text-slate-600">{approval.maker}</TableCell>
                  <TableCell className="font-medium text-slate-700">{approval.amount}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{approval.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-aos-blue hover:bg-aos-blue/10 rounded-md transition-colors" title="Review Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-aos-emerald hover:bg-aos-emerald/10 rounded-md transition-colors" title="Approve">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-aos-rose hover:bg-aos-rose/10 rounded-md transition-colors" title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredApprovals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No pending approvals in this category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
