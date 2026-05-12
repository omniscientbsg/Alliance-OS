import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Search, Filter, Eye, Shield, FileText, Banknote, GitBranch, ArrowRightLeft, Users } from "lucide-react";
import { MOCK_PENDING_APPROVALS, EntityType } from '@/lib/workflow';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ApprovalTimeline } from '@/components/shared/ApprovalTimeline';

const entityIcons: Record<EntityType, React.ReactNode> = {
  policy:             <Shield className="w-4 h-4 text-aos-blue" />,
  endorsement:        <FileText className="w-4 h-4 text-aos-purple" />,
  claim_registration: <FileText className="w-4 h-4 text-aos-rose" />,
  claim_settlement:   <Banknote className="w-4 h-4 text-aos-emerald" />,
  receipt:            <Banknote className="w-4 h-4 text-aos-blue" />,
  payment:            <Banknote className="w-4 h-4 text-aos-amber" />,
  journal:            <FileText className="w-4 h-4 text-aos-violet" />,
  treaty:             <GitBranch className="w-4 h-4 text-aos-coral" />,
  customer_master:    <Users className="w-4 h-4 text-aos-teal" />,
  ri_allocation:      <ArrowRightLeft className="w-4 h-4 text-aos-coral" />,
};

const entityLabels: Record<EntityType, string> = {
  policy: 'Policy', endorsement: 'Endorsement', claim_registration: 'Claim',
  claim_settlement: 'Settlement', receipt: 'Receipt', payment: 'Payment',
  journal: 'Journal', treaty: 'Treaty', customer_master: 'Customer', ri_allocation: 'RI Allocation',
};

export default function ApprovalsView() {
  const [activeTab, setActiveTab] = useState<'all' | EntityType>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());

  const filtered = activeTab === 'all'
    ? MOCK_PENDING_APPROVALS
    : MOCK_PENDING_APPROVALS.filter(a => a.entityType === activeTab);

  const handleApprove = (id: string) => {
    setApprovedIds(prev => new Set([...prev, id]));
  };

  const tabs: { key: 'all' | EntityType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: MOCK_PENDING_APPROVALS.length },
    { key: 'policy', label: 'Policies', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'policy').length },
    { key: 'claim_settlement', label: 'Claims', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'claim_settlement' || a.entityType === 'claim_registration').length },
    { key: 'receipt', label: 'Receipts', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'receipt').length },
    { key: 'payment', label: 'Payments', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'payment').length },
    { key: 'treaty', label: 'Treaties', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'treaty').length },
    { key: 'ri_allocation', label: 'RI', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'ri_allocation').length },
    { key: 'endorsement', label: 'Endorsements', count: MOCK_PENDING_APPROVALS.filter(a => a.entityType === 'endorsement').length },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Approval Queue</h1>
          <p className="text-sm text-slate-500 mt-1">Maker-Checker workflow — review, approve, or reject pending transactions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter by Date
          </button>
          <button className="px-4 py-2 bg-aos-emerald text-white rounded-lg text-sm font-medium hover:bg-aos-emerald/90 transition-colors shadow-sm shadow-aos-emerald/20 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Batch Approve
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{MOCK_PENDING_APPROVALS.length - approvedIds.size}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-aos-amber/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-aos-amber" />
          </div>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Approved Today</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{approvedIds.size + 23}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-aos-emerald/10 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-aos-emerald" />
          </div>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Rejected Today</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">2</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-aos-rose/10 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-aos-rose" />
          </div>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Avg. Approval Time</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">14 min</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-aos-blue/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-aos-blue" />
          </div>
        </Card>
      </div>

      {/* Main table */}
      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl items-center">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.key ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? 'bg-aos-blue/10 text-aos-blue' : 'bg-slate-200 text-slate-500'
                }`}>{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Entity ID, Description..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
            />
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600 w-8">
                  <input type="checkbox" className="rounded text-aos-blue" />
                </TableHead>
                <TableHead className="font-semibold text-slate-600">Type</TableHead>
                <TableHead className="font-semibold text-slate-600">Entity ID</TableHead>
                <TableHead className="font-semibold text-slate-600">Description</TableHead>
                <TableHead className="font-semibold text-slate-600">Submitted By</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Amount</TableHead>
                <TableHead className="font-semibold text-slate-600 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const isApproved = approvedIds.has(item.id);
                return (
                  <TableRow key={item.id} className={`hover:bg-slate-50/50 ${isApproved ? 'opacity-50' : ''}`}>
                    <TableCell>
                      <input type="checkbox" className="rounded text-aos-blue" disabled={isApproved} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {entityIcons[item.entityType]}
                        <span className="text-xs font-medium text-slate-600">{entityLabels[item.entityType]}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-aos-blue font-medium">{item.entityId}</TableCell>
                    <TableCell className="text-sm text-slate-700 max-w-xs truncate">{item.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">{item.submittedBy}</span>
                        <span className="text-xs text-slate-400">{item.submittedDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">{item.amount}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {isApproved ? (
                          <StatusBadge status="approved" size="md" />
                        ) : (
                          <>
                            <button 
                              onClick={() => handleApprove(item.id)}
                              className="p-1.5 rounded-md bg-aos-emerald/10 text-aos-emerald hover:bg-aos-emerald/20 transition-colors" 
                              title="Approve"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-md bg-aos-rose/10 text-aos-rose hover:bg-aos-rose/20 transition-colors" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                              className="p-1.5 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" 
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Inline Approval Detail / Timeline */}
      {selectedItem && (
        <Card className="shadow-sm border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Approval Details</h3>
                <p className="text-sm text-slate-500">Full audit trail for {selectedItem}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-sm text-slate-500 hover:text-slate-900">Close</button>
            </div>
            <ApprovalTimeline events={[
              { id: '1', user: 'SARAH-UW', action: 'created', timestamp: '10/05/2026 09:00', role: 'Underwriter', details: 'Initial record created in the system.' },
              { id: '2', user: 'SARAH-UW', action: 'submitted', timestamp: '10/05/2026 14:30', role: 'Underwriter', details: 'Submitted for approval. Amount exceeds auto-approve threshold of TZS 50,000,000.' },
              { id: '3', user: 'Pending', action: 'approved', timestamp: 'Awaiting...', role: 'Manager', details: 'Requires approval from Manager level or above.' },
            ]} />
          </div>
        </Card>
      )}
    </div>
  );
}
