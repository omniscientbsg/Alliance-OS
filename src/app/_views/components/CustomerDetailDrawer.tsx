import React, { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { User, Shield, Activity, Phone, Mail, MapPin, Briefcase, FileCheck, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CustomerDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export function CustomerDetailDrawer({ isOpen, onClose, customerId }: CustomerDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('profile');

  if (!customerId) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Party: Acme Corp Ltd`}
      subtitle={`ID: ${customerId} • Corporate`}
      size="xl"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-56 shrink-0 space-y-1">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> Profile & KYC</span>
          </button>
          <button onClick={() => setActiveTab('policies')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'policies' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Active Policies (14)</span>
          </button>
          <button onClick={() => setActiveTab('financials')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'financials' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Risk & Exposure</span>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-4 border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Briefcase className="w-4 h-4 text-aos-blue" /> Corporate Details
                  </h3>
                  <div>
                    <p className="text-xs text-slate-500">Registered Name</p>
                    <p className="text-sm font-medium text-slate-900">Acme Corporation Tanzania Limited</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">TIN Number</p>
                    <p className="text-sm font-medium text-slate-900">105-888-222</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">VRN (VAT Reg No)</p>
                    <p className="text-sm font-medium text-slate-900">40-111111-W</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date of Incorporation</p>
                    <p className="text-sm font-medium text-slate-900">14 August 2010</p>
                  </div>
                </Card>

                <Card className="p-4 border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <User className="w-4 h-4 text-aos-blue" /> Contact Information
                  </h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Primary Address</p>
                      <p className="text-sm font-medium text-slate-900">Acme Tower, Floor 4<br/>Bagamoyo Road, Dar Es Salaam<br/>P.O. Box 9988</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Primary Phone</p>
                      <p className="text-sm font-medium text-slate-900">+255 712 345 678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <p className="text-sm font-medium text-slate-900">info@acmecorp.com</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <FileCheck className="w-4 h-4 text-aos-emerald" /> KYC Status
                </h3>
                <div className="flex gap-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-aos-emerald/10 text-aos-emerald text-xs font-medium">Certificate of Incorporation: Verified</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-aos-emerald/10 text-aos-emerald text-xs font-medium">TIN Certificate: Verified</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-aos-amber/10 text-aos-amber text-xs font-medium">Directors IDs: Pending Update</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total GWP (YTD)</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">TZS 450M</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm bg-aos-rose/5 border-aos-rose/20">
                  <p className="text-xs text-aos-rose uppercase tracking-wider font-semibold">Overall Loss Ratio</p>
                  <p className="text-2xl font-bold text-aos-rose mt-1">42%</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Outstanding AR</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">TZS 12.5M</p>
                </Card>
              </div>
              
              <Card className="p-5 border-slate-200 shadow-sm">
                 <h3 className="text-sm font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Total Exposure by Class of Business</h3>
                 <div className="space-y-4">
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">Fire & Perils</span><span className="font-medium">TZS 2.5 Billion</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-aos-blue h-2 rounded-full w-[60%]"></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">Motor Fleet</span><span className="font-medium">TZS 800 Million</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-aos-blue h-2 rounded-full w-[25%]"></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">Marine Cargo</span><span className="font-medium">TZS 400 Million</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-aos-blue h-2 rounded-full w-[15%]"></div></div>
                   </div>
                 </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
