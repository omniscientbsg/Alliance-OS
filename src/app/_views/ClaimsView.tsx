import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Search, Plus, Filter, FileWarning, CheckCircle2, Clock, Activity } from "lucide-react";
import { ClaimDetailDrawer } from './components/ClaimDetailDrawer';
import { RegisterFnolWizard } from './components/RegisterFnolWizard';
import { ClaimSettlementWizard } from './components/ClaimSettlementWizard';

export default function ClaimsView() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);

  const claims = [
    { id: "C11/100/1002/2026/011654", policyId: "P11/2025/100/5042", insured: "Acme Corp Ltd", type: "Fire Damage", dateOfLoss: "2026-04-15", reserve: "TZS 45,000,000", status: "Under Review" },
    { id: "C11/100/1002/2026/011655", policyId: "P11/2025/100/5044", insured: "John Doe", type: "Motor Accident", dateOfLoss: "2026-05-02", reserve: "TZS 3,200,000", status: "Pending Settlement" },
    { id: "C11/100/1002/2026/011656", policyId: "P11/2025/100/5045", insured: "City Construction", type: "Theft of Materials", dateOfLoss: "2026-05-08", reserve: "TZS 12,500,000", status: "FNOL Registration" },
    { id: "C11/100/1002/2026/011500", policyId: "P11/2024/100/4012", insured: "Tech Solutions Inc", type: "Data Breach", dateOfLoss: "2025-11-20", reserve: "TZS 150,000,000", status: "Closed - Paid" },
    { id: "C11/100/1002/2026/011501", policyId: "P11/2025/100/5043", insured: "Global Industries", type: "Cargo Damage", dateOfLoss: "2026-02-10", reserve: "TZS 28,000,000", status: "Surveyor Appointed" },
  ];

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Claims Management</h1>
            <p className="text-sm text-slate-500 mt-1">Register First Notice of Loss (FNOL), track reserves, and process settlements.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button 
              onClick={() => setIsSettlementOpen(true)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
            >
              Process Settlement
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2 bg-aos-rose text-white rounded-lg text-sm font-medium hover:bg-aos-rose/90 transition-colors shadow-sm shadow-aos-rose/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Register FNOL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-200 shadow-sm bg-white">
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-aos-rose/10 text-aos-rose rounded-lg">
                <FileWarning className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">New FNOLs (Today)</p>
                <h3 className="text-2xl font-bold text-slate-900">12</h3>
              </div>
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white">
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-aos-amber/10 text-aos-amber rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Open Claims</p>
                <h3 className="text-2xl font-bold text-slate-900">432</h3>
              </div>
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white">
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-aos-blue/10 text-aos-blue rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Settlement</p>
                <h3 className="text-2xl font-bold text-slate-900">45</h3>
              </div>
            </div>
          </Card>
          <Card className="border-slate-200 shadow-sm bg-white">
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-aos-emerald/10 text-aos-emerald rounded-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Settled (YTD)</p>
                <h3 className="text-2xl font-bold text-slate-900">1,284</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              <button onClick={() => setActiveTab('pending')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'pending' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Requires Action</button>
              <button onClick={() => setActiveTab('open')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'open' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>All Open</button>
              <button onClick={() => setActiveTab('closed')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'closed' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Closed</button>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Claim No, Policy No..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
              />
            </div>
          </div>
          <div className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600 py-3">Claim Number</TableHead>
                  <TableHead className="font-semibold text-slate-600">Policy Number</TableHead>
                  <TableHead className="font-semibold text-slate-600">Insured Name</TableHead>
                  <TableHead className="font-semibold text-slate-600">Loss Type</TableHead>
                  <TableHead className="font-semibold text-slate-600">Date of Loss</TableHead>
                  <TableHead className="font-semibold text-slate-600">Estimated Reserve</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow 
                    key={claim.id} 
                    className="hover:bg-slate-50/50 cursor-pointer group"
                    onClick={() => setSelectedClaim(claim.id)}
                  >
                    <TableCell className="font-medium text-aos-blue group-hover:underline">
                      {claim.id}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {claim.policyId}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{claim.insured}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                        <ShieldAlert className="w-3 h-3 text-slate-500" />
                        {claim.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-700">{claim.dateOfLoss}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{claim.reserve}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${claim.status.includes('Pending') ? 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' : ''}
                        ${claim.status.includes('Closed') ? 'bg-slate-100 text-slate-500 border-slate-200' : ''}
                        ${claim.status.includes('Review') || claim.status.includes('Surveyor') ? 'bg-aos-blue/10 text-aos-blue border-aos-blue/20' : ''}
                        ${claim.status.includes('FNOL') ? 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' : ''}
                      `}>
                        {claim.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <ClaimDetailDrawer 
        isOpen={!!selectedClaim} 
        onClose={() => setSelectedClaim(null)} 
        claimId={selectedClaim} 
      />
      
      <RegisterFnolWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      <ClaimSettlementWizard
        isOpen={isSettlementOpen}
        onClose={() => setIsSettlementOpen(false)}
      />
    </>
  );
}
