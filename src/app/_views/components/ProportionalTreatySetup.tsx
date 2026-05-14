import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, LayoutTemplate, Network, Settings2 } from "lucide-react";

export function ProportionalTreatySetup() {
  const treaties = [
    { id: "TRY-2026-FIRE-QS", name: "Fire & Allied Perils QS", type: "Quota Share", limit: "TZS 5,000,000,000", retention: "20%", period: "01 Jan 2026 - 31 Dec 2026", status: "Active" },
    { id: "TRY-2026-ENG-SUR", name: "Engineering 1st Surplus", type: "Surplus", limit: "15 Lines (TZS 15B)", retention: "TZS 1,000,000,000", period: "01 Jan 2026 - 31 Dec 2026", status: "Active" },
    { id: "TRY-2026-MARINE", name: "Marine Cargo QS & Surplus", type: "Mixed", limit: "TZS 3,000,000,000", retention: "30%", period: "01 Jan 2026 - 31 Dec 2026", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Proportional Treaties Setup</h2>
          <p className="text-sm text-slate-500">Configure Quota Share and Surplus treaty structures, limits, and retentions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-aos-coral text-white rounded-lg text-sm font-medium hover:bg-aos-coral/90 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Treaty
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Network className="w-4 h-4 text-aos-coral" /> Active Treaties</h3>
            </div>
            <Table>
              <TableHeader className="bg-white border-b border-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Treaty Code</TableHead>
                  <TableHead className="font-semibold text-slate-600">Type</TableHead>
                  <TableHead className="font-semibold text-slate-600">Retention</TableHead>
                  <TableHead className="font-semibold text-slate-600">Treaty Limit</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treaties.map((treaty, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell>
                      <p className="font-bold text-aos-blue text-sm">{treaty.id}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{treaty.name}</p>
                    </TableCell>
                    <TableCell><span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">{treaty.type}</span></TableCell>
                    <TableCell className="font-medium text-slate-900 text-sm">{treaty.retention}</TableCell>
                    <TableCell className="font-medium text-slate-900 text-sm">{treaty.limit}</TableCell>
                    <TableCell><span className="text-[10px] font-bold text-aos-emerald bg-aos-emerald/10 px-2 py-0.5 rounded-full">{treaty.status}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-4">
          <Card className="p-5 border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Settings2 className="w-4 h-4 text-slate-400" /> Treaty Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Treaty Class</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none">
                  <option>Fire & Allied Perils</option>
                  <option>Engineering</option>
                  <option>Marine Cargo</option>
                  <option>Motor Commercial</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Treaty Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none">
                    <option>Quota Share</option>
                    <option>Surplus</option>
                    <option>Fac Obligatory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none">
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Company Retention (%)</label>
                <input type="number" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none" defaultValue={20} />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Treaty Capacity / Limit (TZS)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none" defaultValue="5,000,000,000" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">RI Commission (%)</label>
                <input type="number" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-coral outline-none" defaultValue={25} />
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">Cancel</button>
                <button className="flex-1 py-2 bg-aos-coral text-white rounded-lg text-sm font-medium hover:bg-aos-coral/90 transition-colors">Save Details</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
