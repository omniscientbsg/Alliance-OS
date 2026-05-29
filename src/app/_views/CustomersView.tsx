"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Plus, Filter, Building2, Phone, Mail, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { CustomerDetailDrawer } from './components/CustomerDetailDrawer';
import { CustomerWizard } from './components/CustomerWizard';

export default function CustomersView() {
  const [activeTab, setActiveTab] = useState('corporate');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const customers = [
    { id: "CUST-10024", name: "Acme Corp Ltd", type: "Corporate", contact: "John Smith", email: "john@acmecorp.com", phone: "+255 712 345 678", policies: 14, gwp: "TZS 450M", lossRatio: "42%" },
    { id: "CUST-10025", name: "Global Industries", type: "Corporate", contact: "Sarah Jones", email: "sarah@globalind.com", phone: "+255 722 111 222", policies: 8, gwp: "TZS 120M", lossRatio: "15%" },
    { id: "CUST-10026", name: "City Construction", type: "Corporate", contact: "Mike Davis", email: "mike@cityconst.co.tz", phone: "+255 733 444 555", policies: 22, gwp: "TZS 850M", lossRatio: "78%" },
    { id: "CUST-10027", name: "Tech Solutions Inc", type: "Corporate", contact: "Lisa White", email: "lisa@techsol.com", phone: "+255 744 666 777", policies: 3, gwp: "TZS 45M", lossRatio: "0%" },
    { id: "CUST-10028", name: "National Bank of TZ", type: "Bank/Financial", contact: "David Brown", email: "insurance@nbtz.co.tz", phone: "+255 755 888 999", policies: 156, gwp: "TZS 4.2B", lossRatio: "35%" },
  ];

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Party Master (CRM)</h1>
            <p className="text-sm text-slate-500 mt-1">Manage corporate clients, individual customers, brokers, and agents.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Party
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-200 shadow-sm bg-white">
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-aos-blue/10 text-aos-blue rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Active Parties</p>
                <h3 className="text-2xl font-bold text-slate-900">4,281</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              <button onClick={() => setActiveTab('corporate')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'corporate' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Corporate</button>
              <button onClick={() => setActiveTab('individual')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'individual' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Individual</button>
              <button onClick={() => setActiveTab('brokers')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'brokers' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Brokers & Agents</button>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Name, Email, Phone..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
              />
            </div>
          </div>
          <div className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600 py-3">Party Name / ID</TableHead>
                  <TableHead className="font-semibold text-slate-600">Contact Details</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-center">Active Policies</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Total GWP</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Loss Ratio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow 
                    key={customer.id} 
                    className="hover:bg-slate-50/50 cursor-pointer group"
                    onClick={() => setSelectedCustomer(customer.id)}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-aos-blue group-hover:underline">{customer.name}</span>
                        <span className="text-xs text-slate-500">{customer.id} • {customer.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-slate-700 gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {customer.phone}</div>
                        <div className="flex items-center text-sm text-slate-700 gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        {customer.policies}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      {customer.gwp}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-1 font-medium ${parseInt(customer.lossRatio) > 60 ? 'text-aos-rose' : 'text-aos-emerald'}`}>
                        {parseInt(customer.lossRatio) > 60 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {customer.lossRatio}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <CustomerDetailDrawer 
        isOpen={!!selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
        customerId={selectedCustomer} 
      />

      <CustomerWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </>
  );
}
