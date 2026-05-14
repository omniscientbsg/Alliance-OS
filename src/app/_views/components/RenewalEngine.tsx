import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, AlertTriangle, Play, Mail, FileText, Send } from "lucide-react";
import { SmartRenewalPanel } from '@/components/ai/SmartRenewalPanel';

export function RenewalEngine() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  const renewals = [
    { id: "P11/2024/100/4012", insured: "Tech Solutions Inc", expiry: "In 5 Days", premium: "TZS 2,100,000", status: "Auto-Quote Sent", risk: "Low" },
    { id: "P11/2024/100/4015", insured: "Mlimani Logistics", expiry: "In 12 Days", premium: "TZS 8,400,000", status: "Broker Accepted", risk: "Medium" },
    { id: "P11/2024/100/4018", insured: "Serengeti Safaris", expiry: "In 25 Days", premium: "TZS 15,000,000", status: "Pending Review", risk: "High" },
    { id: "P11/2024/100/4022", insured: "Dar Port Authority", expiry: "In 28 Days", premium: "TZS 45,000,000", status: "Pending Review", risk: "Low" },
  ];

  const togglePolicy = (id: string) => {
    setSelectedPolicies(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-slate-200 shadow-sm flex items-center gap-4 bg-white">
              <div className="w-12 h-12 bg-aos-emerald/10 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-aos-emerald" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Auto-Renewed (MTD)</h3>
                <p className="text-2xl font-bold text-slate-900">142</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200 shadow-sm flex items-center gap-4 bg-white">
              <div className="w-12 h-12 bg-aos-blue/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-aos-blue" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Quotes Sent (T-30)</h3>
                <p className="text-2xl font-bold text-slate-900">85</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200 shadow-sm flex items-center gap-4 bg-white">
              <div className="w-12 h-12 bg-aos-amber/10 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-aos-amber" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">At Risk / High Loss</h3>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
            </Card>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600 font-medium flex items-center gap-2">
              <span className="bg-aos-blue text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">{selectedPolicies.length}</span> 
              Selected for Batch Action
            </div>
            <div className="flex gap-2">
              <button 
                disabled={selectedPolicies.length === 0}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-sm font-medium hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-aos-blue" /> Generate Quotes
              </button>
              <button 
                disabled={selectedPolicies.length === 0}
                className="px-3 py-1.5 bg-aos-emerald text-white rounded text-sm font-medium hover:bg-aos-emerald/90 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Send to Broker
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold text-slate-600">Policy Number</TableHead>
                  <TableHead className="font-semibold text-slate-600">Insured Name</TableHead>
                  <TableHead className="font-semibold text-slate-600">Expiring Premium</TableHead>
                  <TableHead className="font-semibold text-slate-600">Expiry</TableHead>
                  <TableHead className="font-semibold text-slate-600">AI Risk Factor</TableHead>
                  <TableHead className="font-semibold text-slate-600">Renewal Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renewals.map((renewal) => (
                  <TableRow key={renewal.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="rounded text-aos-blue focus:ring-aos-blue cursor-pointer w-4 h-4"
                        checked={selectedPolicies.includes(renewal.id)}
                        onChange={() => togglePolicy(renewal.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-aos-blue">{renewal.id}</TableCell>
                    <TableCell className="font-medium text-slate-900">{renewal.insured}</TableCell>
                    <TableCell className="text-slate-700 font-medium">{renewal.premium}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-aos-amber text-sm font-medium bg-aos-amber/10 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> {renewal.expiry}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        renewal.risk === 'Low' ? 'bg-aos-emerald/10 text-aos-emerald' : 
                        renewal.risk === 'Medium' ? 'bg-aos-amber/10 text-aos-amber' : 
                        'bg-aos-rose/10 text-aos-rose'
                      }`}>
                        {renewal.risk} Risk
                      </span>
                    </TableCell>
                    <TableCell>
                      {renewal.status === 'Pending Review' ? (
                        <span className="text-slate-500 text-sm font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">Pending</span>
                      ) : renewal.status === 'Auto-Quote Sent' ? (
                        <span className="text-aos-blue text-sm font-medium bg-aos-blue/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 w-max">
                          <Send className="w-3 h-3" /> Quote Sent
                        </span>
                      ) : (
                        <span className="text-aos-emerald text-sm font-medium bg-aos-emerald/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3" /> Broker Accepted
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="lg:col-span-1">
          <SmartRenewalPanel />
        </div>
      </div>
    </div>
  );
}
