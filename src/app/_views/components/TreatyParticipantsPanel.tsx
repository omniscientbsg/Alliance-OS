import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search } from "lucide-react";

export function TreatyParticipantsPanel() {
  const participants = [
    { name: "Swiss Re", role: "Lead Reinsurer", share: "40%", placement: "Direct", rating: "AA-", contact: "zurich.desk@swissre.com" },
    { name: "Munich Re", role: "Follower", share: "30%", placement: "Direct", rating: "AA", contact: "africa.prop@munichre.com" },
    { name: "Kenya Re", role: "Follower", share: "15%", placement: "Broker (Aon)", rating: "B+", contact: "treaty@kenyare.co.ke" },
    { name: "Zep-Re (PTA Re)", role: "Follower", share: "15%", placement: "Direct", rating: "B++", contact: "underwriting@zep-re.com" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Treaty Participants & Security</h2>
          <p className="text-sm text-slate-500">Manage reinsurer shares, roles, and financial security ratings per treaty.</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Reinsurer..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-coral/20 transition-all"
          />
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Users className="w-4 h-4 text-aos-coral" /> Panel: Fire & Allied Perils QS (2026)</h3>
          <span className="text-xs font-bold text-aos-emerald bg-aos-emerald/10 px-2.5 py-1 rounded-full">100% Placed</span>
        </div>
        <Table>
          <TableHeader className="bg-white border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Reinsurer Name</TableHead>
              <TableHead className="font-semibold text-slate-600">Role</TableHead>
              <TableHead className="font-semibold text-slate-600">Share %</TableHead>
              <TableHead className="font-semibold text-slate-600">Placement Type</TableHead>
              <TableHead className="font-semibold text-slate-600">S&P Rating</TableHead>
              <TableHead className="font-semibold text-slate-600">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((p, idx) => (
              <TableRow key={idx} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-slate-900 text-sm">{p.name}</TableCell>
                <TableCell>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${p.role === 'Lead Reinsurer' ? 'bg-aos-coral/10 text-aos-coral' : 'bg-slate-100 text-slate-600'}`}>
                    {p.role}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-sm">{p.share}</TableCell>
                <TableCell className="text-slate-600 text-sm">{p.placement}</TableCell>
                <TableCell className="font-medium text-slate-900 text-sm">{p.rating}</TableCell>
                <TableCell className="text-aos-blue text-sm hover:underline cursor-pointer">{p.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
