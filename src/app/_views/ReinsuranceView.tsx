import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, Share2, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { RIAllocationModal } from './components/RIAllocationModal';
import { ProportionalTreatySetup } from './components/ProportionalTreatySetup';
import { XOLTreatySetup } from './components/XOLTreatySetup';
import { TreatyParticipantsPanel } from './components/TreatyParticipantsPanel';
import { BordereauxPanel } from './components/BordereauxPanel';

export default function ReinsuranceView() {
  const [activeTab, setActiveTab] = useState('pending');
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const pendingAllocations = [
    { id: "P11/2026/100/5042", insured: "Acme Corp Ltd", product: "Motor Commercial", tsi: "TZS 1,500,000,000", premium: "TZS 45,000,000", status: "Pending Approval" },
    { id: "P11/2026/200/1008", insured: "Global Industries", product: "Fire & Allied Perils", tsi: "TZS 8,500,000,000", premium: "TZS 120,000,000", status: "Pending Approval" },
    { id: "P11/2026/300/4055", insured: "City Construction", product: "Contractors All Risk", tsi: "TZS 25,000,000,000", premium: "TZS 350,000,000", status: "Facultative Required" },
  ];

  const handleOpenAllocation = (policyId: string) => {
    setSelectedPolicy(policyId);
    setIsAllocationOpen(true);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reinsurance & Treaties</h1>
            <p className="text-sm text-slate-500 mt-1">Manage treaty structures, review allocations, and generate bordereaux.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-4 py-2 bg-aos-coral text-white rounded-lg text-sm font-medium hover:bg-aos-coral/90 transition-colors shadow-sm shadow-aos-coral/20 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Auto-Allocate Batch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Allocations</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-coral/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-aos-coral" />
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Allocated (Today)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">45</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-emerald/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-aos-emerald" />
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Premium Ceded (MTD)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">TZS 1.2B</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-aos-blue/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-aos-blue" />
            </div>
          </Card>
        </div>

        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide mb-6 border border-slate-200">
          <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'pending' || activeTab === 'approved' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Allocations</button>
          <button onClick={() => setActiveTab('prop-treaties')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'prop-treaties' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Proportional Treaties</button>
          <button onClick={() => setActiveTab('xol-treaties')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'xol-treaties' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>XOL Treaties</button>
          <button onClick={() => setActiveTab('participants')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'participants' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Treaty Participants</button>
          <button onClick={() => setActiveTab('bordereaux')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'bordereaux' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Bordereaux Reports</button>
        </div>

        {(activeTab === 'pending' || activeTab === 'approved') && (
          <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl items-center">
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
                <button onClick={() => setActiveTab('pending')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'pending' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Pending Review</button>
                <button onClick={() => setActiveTab('approved')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'approved' ? 'bg-white text-aos-coral shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Allocated</button>
              </div>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search Policy No, Insured..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-coral/20 transition-all"
                />
              </div>
            </div>
            <div className="p-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600">Policy Number</TableHead>
                    <TableHead className="font-semibold text-slate-600">Insured</TableHead>
                    <TableHead className="font-semibold text-slate-600">Product</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right">Total SI (100%)</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right">Premium (100%)</TableHead>
                    <TableHead className="font-semibold text-slate-600">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAllocations.map((alloc) => (
                    <TableRow key={alloc.id} className="hover:bg-slate-50/50 cursor-pointer" onClick={() => handleOpenAllocation(alloc.id)}>
                      <TableCell className="font-medium text-slate-900">{alloc.id}</TableCell>
                      <TableCell className="text-slate-600 font-medium">{alloc.insured}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{alloc.product}</TableCell>
                      <TableCell className="text-right text-slate-900">{alloc.tsi}</TableCell>
                      <TableCell className="text-right text-slate-900">{alloc.premium}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border
                          ${alloc.status === 'Pending Approval' ? 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' : 'bg-aos-rose/10 text-aos-rose border-aos-rose/20'}
                        `}>
                          {alloc.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-aos-coral font-medium text-sm hover:underline flex items-center gap-1 ml-auto">
                          Review <Share2 className="w-3 h-3" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {activeTab === 'prop-treaties' && <ProportionalTreatySetup />}
        {activeTab === 'xol-treaties' && <XOLTreatySetup />}
        {activeTab === 'participants' && <TreatyParticipantsPanel />}
        {activeTab === 'bordereaux' && <BordereauxPanel />}

      </div>

      <RIAllocationModal
        isOpen={isAllocationOpen}
        onClose={() => setIsAllocationOpen(false)}
        policyId={selectedPolicy || undefined}
      />
    </>
  );
}
