import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Calendar, FileText, CheckCircle2 } from "lucide-react";

export function BordereauxPanel() {
  const reports = [
    { id: "BDX-2026-Q1-PRM", period: "Q1 2026", type: "Premium Bordereau", treaty: "Fire QS & Surplus", generatedOn: "15 Apr 2026", status: "Sent to RI" },
    { id: "BDX-2026-Q1-CLM", period: "Q1 2026", type: "Claims Bordereau", treaty: "Fire QS & Surplus", generatedOn: "15 Apr 2026", status: "Sent to RI" },
    { id: "BDX-2026-M04-PRM", period: "Apr 2026", type: "Premium Bordereau", treaty: "Motor QS", generatedOn: "05 May 2026", status: "Generated" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Bordereaux Generation</h2>
          <p className="text-sm text-slate-500">Generate and manage periodic premium and claims bordereaux for reinsurers.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm flex items-center gap-2">
            <FileText className="w-4 h-4" /> Run Generation Engine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card className="p-5 border-slate-200 shadow-sm bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Generation Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Bordereau Type</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none">
                  <option>Premium Bordereau</option>
                  <option>Claims Bordereau</option>
                  <option>Outstanding Claims Reserve (OSLR)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Treaty Reference</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none">
                  <option>All Active Treaties</option>
                  <option>TRY-2026-FIRE-QS</option>
                  <option>TRY-2026-ENG-SUR</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Period (Quarter/Month)</label>
                <input type="month" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" defaultValue="2026-04" />
              </div>
              <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">Generate Draft</button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Recent Generated Reports</h3>
            </div>
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Report ID</TableHead>
                  <TableHead className="font-semibold text-slate-600">Type / Period</TableHead>
                  <TableHead className="font-semibold text-slate-600">Generated On</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-900 text-sm">{report.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-900 text-sm">{report.type}</p>
                      <p className="text-xs text-slate-500">{report.treaty} • {report.period}</p>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{report.generatedOn}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'Sent to RI' ? 'bg-aos-emerald/10 text-aos-emerald' : 'bg-slate-100 text-slate-700'}`}>
                        {report.status === 'Sent to RI' && <CheckCircle2 className="w-3 h-3" />} {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-aos-blue hover:text-aos-blue/80 transition-colors"><FileDown className="w-5 h-5" /></button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
