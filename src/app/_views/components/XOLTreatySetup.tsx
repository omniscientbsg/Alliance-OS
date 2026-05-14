import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ShieldAlert, Layers } from "lucide-react";

export function XOLTreatySetup() {
  const layers = [
    { name: "Layer 1 (Working Layer)", limit: "TZS 1,000,000,000", excess: "TZS 500,000,000", mdp: "TZS 15,000,000", rate: "1.5%", reinstatements: "1 @ 100%" },
    { name: "Layer 2", limit: "TZS 3,500,000,000", excess: "TZS 1,500,000,000", mdp: "TZS 25,000,000", rate: "0.8%", reinstatements: "2 @ 100%" },
    { name: "Layer 3 (Catastrophe)", limit: "TZS 10,000,000,000", excess: "TZS 5,000,000,000", mdp: "TZS 40,000,000", rate: "0.4%", reinstatements: "1 @ 50%" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Non-Proportional (XOL) Treaties</h2>
          <p className="text-sm text-slate-500">Configure Excess of Loss layers, deductibles, MDPs, and reinstatement terms.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-aos-coral text-white rounded-lg text-sm font-medium hover:bg-aos-coral/90 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> New XOL Program
          </button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-aos-coral" /> Property Risk XOL Program (2026)</h3>
            <p className="text-xs text-slate-500 mt-1">Covers Fire, Engineering, and selected Marine. Underlying Retention: TZS 500M</p>
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Add Layer
          </button>
        </div>
        <Table>
          <TableHeader className="bg-white border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Layer Name</TableHead>
              <TableHead className="font-semibold text-slate-600">Limit</TableHead>
              <TableHead className="font-semibold text-slate-600">Excess Of (Deductible)</TableHead>
              <TableHead className="font-semibold text-slate-600">Min. Deposit Premium</TableHead>
              <TableHead className="font-semibold text-slate-600">GNPI Rate</TableHead>
              <TableHead className="font-semibold text-slate-600">Reinstatements</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layers.map((layer, idx) => (
              <TableRow key={idx} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-slate-900 text-sm">{layer.name}</TableCell>
                <TableCell className="font-medium text-aos-blue text-sm">{layer.limit}</TableCell>
                <TableCell className="font-medium text-slate-900 text-sm">{layer.excess}</TableCell>
                <TableCell className="text-slate-600 text-sm">{layer.mdp}</TableCell>
                <TableCell className="text-slate-600 text-sm font-semibold">{layer.rate}</TableCell>
                <TableCell className="text-slate-600 text-sm">{layer.reinstatements}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
