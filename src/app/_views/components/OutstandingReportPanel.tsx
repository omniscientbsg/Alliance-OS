import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, TrendingUp, AlertTriangle } from "lucide-react";

export function OutstandingReportPanel() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Outstanding Premiums Report</h2>
          <p className="text-sm text-slate-500">Aging analysis of unpaid premiums by broker and direct clients.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-slate-200 shadow-sm bg-white border-l-4 border-l-slate-300">
          <p className="text-sm font-medium text-slate-500">0 - 30 Days</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">TZS 120.5M</h3>
        </Card>
        <Card className="p-4 border-slate-200 shadow-sm bg-white border-l-4 border-l-aos-blue">
          <p className="text-sm font-medium text-slate-500">31 - 60 Days</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">TZS 85.0M</h3>
        </Card>
        <Card className="p-4 border-slate-200 shadow-sm bg-white border-l-4 border-l-aos-amber">
          <p className="text-sm font-medium text-slate-500">61 - 90 Days</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">TZS 45.2M</h3>
        </Card>
        <Card className="p-4 border-slate-200 shadow-sm bg-aos-rose/5 border-l-4 border-l-aos-rose">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-aos-rose flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Over 90 Days</p>
          </div>
          <h3 className="text-xl font-bold text-aos-rose mt-1">TZS 215.8M</h3>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-slate-400" /> Top Outstanding Accounts</h3>
        </div>
        <Table>
          <TableHeader className="bg-white border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Client / Broker Name</TableHead>
              <TableHead className="font-semibold text-slate-600">Type</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">0-30 Days</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">31-60 Days</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">61-90 Days</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">&gt; 90 Days</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">Total Outstanding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-slate-50/50">
              <TableCell className="font-medium text-slate-900 text-sm">Marsh Brokers Tanzania</TableCell>
              <TableCell><span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">Broker</span></TableCell>
              <TableCell className="text-right text-slate-600">45,000,000</TableCell>
              <TableCell className="text-right text-slate-600">20,000,000</TableCell>
              <TableCell className="text-right text-slate-600">-</TableCell>
              <TableCell className="text-right text-aos-rose font-medium">10,000,000</TableCell>
              <TableCell className="text-right font-bold text-slate-900 bg-slate-50/50">TZS 75,000,000</TableCell>
            </TableRow>
            <TableRow className="hover:bg-slate-50/50">
              <TableCell className="font-medium text-slate-900 text-sm">Acme Corp Ltd</TableCell>
              <TableCell><span className="text-xs bg-aos-blue/10 text-aos-blue px-2 py-0.5 rounded font-medium">Direct</span></TableCell>
              <TableCell className="text-right text-slate-600">-</TableCell>
              <TableCell className="text-right text-slate-600">-</TableCell>
              <TableCell className="text-right text-slate-600">15,000,000</TableCell>
              <TableCell className="text-right text-aos-rose font-medium">150,000,000</TableCell>
              <TableCell className="text-right font-bold text-slate-900 bg-slate-50/50">TZS 165,000,000</TableCell>
            </TableRow>
            <TableRow className="hover:bg-slate-50/50 border-t-2 border-slate-100 font-bold bg-slate-50/30">
              <TableCell colSpan={2} className="text-right text-slate-600">TOTALS</TableCell>
              <TableCell className="text-right text-slate-900">120,500,000</TableCell>
              <TableCell className="text-right text-slate-900">85,000,000</TableCell>
              <TableCell className="text-right text-slate-900">45,200,000</TableCell>
              <TableCell className="text-right text-aos-rose">215,800,000</TableCell>
              <TableCell className="text-right text-slate-900">TZS 466,500,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
