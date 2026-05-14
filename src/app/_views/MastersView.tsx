import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Plus, Search, Layers, Calculator, FileText, ArrowRightLeft, Shield, Save, GitBranch, FileCode2, BookOpen, KeySquare, ChevronDown, ChevronRight, Wrench } from "lucide-react";

import { BilingualField } from '@/components/ui/bilingual-field';

export default function MastersView() {
  const [activeTab, setActiveTab] = useState('product');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['product_uw']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const masterCategories = [
    {
      id: 'product_uw',
      title: 'Product & Underwriting',
      icon: <Layers className="w-4 h-4" />,
      items: [
        { id: 'product', title: 'Product & Flex Setup' },
        { id: 'rating', title: 'Rating Engine Setup' },
        { id: 'coverage', title: 'Coverage Master' },
        { id: 'deductible', title: 'Deductibles Master' },
        { id: 'clauses', title: 'Clauses & Warranties' },
        { id: 'occupations', title: 'Occupations Master' },
        { id: 'vehicle_make', title: 'Vehicle Make/Model' },
        { id: 'geography', title: 'Geographical Zones' },
      ]
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      icon: <Calculator className="w-4 h-4" />,
      items: [
        { id: 'tax', title: 'Tax & Charges' },
        { id: 'gl_codes', title: 'GL Transaction Codes' },
        { id: 'chart_accounts', title: 'Chart of Accounts' },
        { id: 'banks', title: 'Bank Master' },
        { id: 'exchange_rates', title: 'Exchange Rates' },
        { id: 'payment_terms', title: 'Payment Terms' },
        { id: 'cost_centers', title: 'Cost Centers' },
        { id: 'budget', title: 'Budget Allocation' },
      ]
    },
    {
      id: 'reinsurance',
      title: 'Reinsurance',
      icon: <ArrowRightLeft className="w-4 h-4" />,
      items: [
        { id: 'ri', title: 'Non-Proportional (XOL)' },
        { id: 'ri_prop', title: 'Proportional Treaties' },
        { id: 'reinsurers', title: 'Reinsurer Master' },
        { id: 'ri_brokers', title: 'RI Broker Master' },
        { id: 'ri_commission', title: 'RI Commission Setup' },
        { id: 'pool', title: 'Pool Arrangements' },
        { id: 'ri_pools', title: 'Retrocession Setup' },
        { id: 'ri_ratings', title: 'Security Ratings' },
      ]
    },
    {
      id: 'claims_ops',
      title: 'Claims & Operations',
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        { id: 'doc_policy', title: 'Policy Docs Setup' },
        { id: 'doc_claims', title: 'Claims Docs Setup' },
        { id: 'surveyors', title: 'Surveyors Master' },
        { id: 'loss_adjusters', title: 'Loss Adjusters' },
        { id: 'repairers', title: 'Garages / Repairers' },
        { id: 'lawyers', title: 'Legal Counsel' },
        { id: 'salvage_buyers', title: 'Salvage Buyers' },
        { id: 'medical', title: 'Medical Providers' },
      ]
    },
    {
      id: 'organization',
      title: 'Organization Setup',
      icon: <Shield className="w-4 h-4" />,
      items: [
        { id: 'branches', title: 'Branch Master' },
        { id: 'departments', title: 'Departments' },
        { id: 'users', title: 'Users & Roles' },
        { id: 'workflows', title: 'Approval Workflows' },
        { id: 'brokers', title: 'Broker / Agency Master' },
        { id: 'sales_execs', title: 'Sales Executives' },
        { id: 'audit', title: 'Audit Trail Settings' },
        { id: 'system', title: 'System Parameters' },
      ]
    }
  ];

  const getActiveTabTitle = () => {
    for (const cat of masterCategories) {
      const item = cat.items.find(i => i.id === activeTab);
      if (item) return item.title;
    }
    return 'Configuration';
  };

  const detailedTabs = ['product', 'rating', 'tax', 'ri', 'doc_policy', 'doc_claims', 'gl_codes'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Setup Engine</h1>
          <p className="text-sm text-slate-500 mt-1">Configure products, rating engines, taxes, and reinsurance treaties.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
          <button className="px-4 py-2 bg-aos-purple text-white rounded-lg text-sm font-medium hover:bg-aos-purple/90 transition-colors shadow-sm shadow-aos-purple/20 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Setup
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 pb-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-72 flex flex-col gap-2 shrink-0 h-full overflow-y-auto pr-2 custom-scrollbar">
          {masterCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const hasActiveChild = category.items.some(item => item.id === activeTab);
            
            return (
              <div key={category.id} className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 text-sm font-semibold transition-colors ${
                    hasActiveChild ? 'bg-slate-50 text-aos-purple' : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>
                
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-100 p-1">
                    {category.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-9 py-2 rounded-md text-sm transition-colors ${
                          activeTab === item.id 
                            ? 'bg-aos-purple/10 text-aos-purple font-medium' 
                            : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-y-auto pl-2">
          {activeTab === 'product' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-purple/10 rounded-md text-aos-purple"><Layers className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Block Definition (Flex Field Engine)</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Product: 5042 (Corporate Plus)</span>
              </div>
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Target Database Table</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700" value="PGIT_POL_RISK_ADDL_INFO" readOnly />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Block Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700" value="PGIT_POL_RISK_ADDL_INFO_01" readOnly />
                  </div>
                  <div>
                    <BilingualField 
                      label="UI Label Mapping" 
                      id="ui-label" 
                      primaryPlaceholder="Risk Details" 
                      secondaryPlaceholder="Maelezo ya Hatari" 
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Field Definition Mapping</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-xs font-semibold">DB Column</TableHead>
                          <TableHead className="text-xs font-semibold">Boiler Plate Text (Label)</TableHead>
                          <TableHead className="text-xs font-semibold">Data Type</TableHead>
                          <TableHead className="text-xs font-semibold">Display Length</TableHead>
                          <TableHead className="text-xs font-semibold">Properties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs text-aos-purple">PRAI_NUM_01</TableCell>
                          <TableCell><input type="text" className="w-full px-2 py-1 text-sm border-b border-slate-300 outline-none focus:border-aos-purple" defaultValue="Property Policy No" /></TableCell>
                          <TableCell className="text-sm">Number</TableCell>
                          <TableCell className="text-sm">226</TableCell>
                          <TableCell className="flex gap-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-xs rounded border border-slate-200">Enterable</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-xs rounded border border-slate-200">Mandatory</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs text-aos-purple">PRAI_CHAR_05</TableCell>
                          <TableCell><input type="text" className="w-full px-2 py-1 text-sm border-b border-slate-300 outline-none focus:border-aos-purple" defaultValue="Risk Location" /></TableCell>
                          <TableCell className="text-sm">Varchar2</TableCell>
                          <TableCell className="text-sm">240</TableCell>
                          <TableCell className="flex gap-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-xs rounded border border-slate-200">Enterable</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'rating' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-purple/10 rounded-md text-aos-purple"><Calculator className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Rating Cover Parameter Setup</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Section: 100101 (Motor Commercial)</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Premium Calculation Logic</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-purple outline-none">
                      <option>013 — Rate on SI against Cover</option>
                      <option>001 — Flat Rate</option>
                      <option>015 — Custom User Formula</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Rating Level</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-purple outline-none">
                      <option>F — Field Level</option>
                      <option>P — Policy Level</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Tariff Parameter Mapping (Table: PTD_VALUE_SET)</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-xs font-semibold">Tariff Table Column</TableHead>
                          <TableHead className="text-xs font-semibold">Mapped Business Parameter</TableHead>
                          <TableHead className="text-xs font-semibold text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600">PTD_VALUE_SET1</TableCell>
                          <TableCell className="text-sm font-medium">Body Type (From)</TableCell>
                          <TableCell className="text-right"><button className="text-aos-blue text-xs font-medium hover:underline">Edit</button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600">PTD_VALUE_SET2</TableCell>
                          <TableCell className="text-sm font-medium">Body Type (To)</TableCell>
                          <TableCell className="text-right"><button className="text-aos-blue text-xs font-medium hover:underline">Edit</button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600">PTD_VALUE_SET3</TableCell>
                          <TableCell className="text-sm font-medium">Usage Type (From)</TableCell>
                          <TableCell className="text-right"><button className="text-aos-blue text-xs font-medium hover:underline">Edit</button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600">PTD_VALUE_SET4</TableCell>
                          <TableCell className="text-sm font-medium">Usage Type (To)</TableCell>
                          <TableCell className="text-right"><button className="text-aos-blue text-xs font-medium hover:underline">Edit</button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600">PTD_VALUE_SET5</TableCell>
                          <TableCell className="text-sm font-medium">Vehicle Age (From)</TableCell>
                          <TableCell className="text-right"><button className="text-aos-blue text-xs font-medium hover:underline">Edit</button></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <button className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-300">
                    + Add Parameter Mapping
                  </button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'tax' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-amber/10 rounded-md text-aos-amber"><FileText className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Tax and Charges Master</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Global Configuration</span>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-semibold text-slate-600">Tax/Charge Code</TableHead>
                      <TableHead className="font-semibold text-slate-600">Description</TableHead>
                      <TableHead className="font-semibold text-slate-600">Application Basis</TableHead>
                      <TableHead className="font-semibold text-slate-600">Current Rate</TableHead>
                      <TableHead className="font-semibold text-slate-600">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-900">V</TableCell>
                      <TableCell className="text-slate-600">Value Added Tax (VAT)</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-[10px] rounded border border-slate-200">Insurance Premium</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-[10px] rounded border border-slate-200">Policy Commission</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-aos-amber font-semibold">18.00%</TableCell>
                      <TableCell><span className="text-aos-emerald text-xs font-medium">Active</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-900">L1</TableCell>
                      <TableCell className="text-slate-600">Training Levy</TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 bg-slate-100 text-[10px] rounded border border-slate-200">Insurance Premium</span>
                      </TableCell>
                      <TableCell className="text-aos-amber font-semibold">1.00%</TableCell>
                      <TableCell><span className="text-aos-emerald text-xs font-medium">Active</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-900">SD</TableCell>
                      <TableCell className="text-slate-600">Stamp Duty</TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 bg-slate-100 text-[10px] rounded border border-slate-200">Per Document</span>
                      </TableCell>
                      <TableCell className="text-slate-700 font-semibold">Flat TZS 5,000</TableCell>
                      <TableCell><span className="text-aos-emerald text-xs font-medium">Active</span></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}

          {activeTab === 'ri' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-coral/10 rounded-md text-aos-coral"><GitBranch className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Non-Proportional Treaty (XOL)</h3>
                </div>
                <span className="px-2.5 py-1 bg-aos-emerald/10 text-aos-emerald text-xs font-bold rounded-md uppercase tracking-wide">Approved</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Treaty Code</p>
                    <p className="font-medium text-slate-900">MAR-HULL-XOL-2023</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Description</p>
                    <p className="font-medium text-slate-900">Marine Cargo & Hull XOL 2023 Excess of Loss</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Treaty Year / Currency</p>
                    <p className="font-medium text-slate-900">2023 / TZS</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Expected GNPI</p>
                    <p className="font-medium text-slate-900">2,100,000,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Min Premium</p>
                    <p className="font-medium text-slate-900">42,320,000 (Adj Rate: 1.58%)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Excess of Loss (XOL) Layers</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-xs font-semibold">Layer ID</TableHead>
                          <TableHead className="text-xs font-semibold">Priority (Deductible)</TableHead>
                          <TableHead className="text-xs font-semibold">Limit</TableHead>
                          <TableHead className="text-xs font-semibold">Reinstatements</TableHead>
                          <TableHead className="text-xs font-semibold text-right">Aggregate Limit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-aos-coral/5 border-l-2 border-l-aos-coral">
                          <TableCell className="font-medium">Layer 001</TableCell>
                          <TableCell>90,000,000</TableCell>
                          <TableCell className="font-semibold text-slate-900">800,000,000</TableCell>
                          <TableCell>4 (Full)</TableCell>
                          <TableCell className="text-right">3,550,000,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-aos-coral/10 border-l-2 border-l-aos-coral">
                          <TableCell className="font-medium">Layer 002</TableCell>
                          <TableCell>800,000,000</TableCell>
                          <TableCell className="font-semibold text-slate-900">3,000,000,000</TableCell>
                          <TableCell>3 (Full)</TableCell>
                          <TableCell className="text-right">8,800,000,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-aos-coral/20 border-l-2 border-l-aos-coral">
                          <TableCell className="font-medium">Layer 003</TableCell>
                          <TableCell>3,000,000,000</TableCell>
                          <TableCell className="font-semibold text-slate-900">6,000,000,000</TableCell>
                          <TableCell>1 (Full)</TableCell>
                          <TableCell className="text-right">6,000,000,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'doc_policy' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-blue/10 rounded-md text-aos-blue"><FileCode2 className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Document Setup — Policy</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Doc Code: 10-PL-01-001 (Motor Private)</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Currency Rate Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                      <option>Buying</option>
                      <option>Selling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Mode of Posting</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                      <option>Online</option>
                      <option>Batch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Policy No Gen Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                      <option>Setup</option>
                      <option>Automatic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Agent A/C Doc. Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                      <option>Single Accounting</option>
                      <option>Multiple Accounting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Rounding & Commission Rules</h4>
                  <div className="grid grid-cols-3 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">SI Round To</label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                        <option>00 NO ROUND OFF</option>
                        <option>Nearest 10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Prem Round To</label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                        <option>00 NO ROUND OFF</option>
                        <option>Nearest 10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Commission Round To</label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-blue outline-none">
                        <option>00 NO ROUND OFF</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Configuration Flags</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> Inward Commission Req.</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> Agent Commission Req.</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> Copy Condition from Parent</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> RI Allocation Required</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> Apply Short Rate Y/N</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" defaultChecked /> Generate Policy on Renewal</label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'doc_claims' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-rose/10 rounded-md text-aos-rose"><BookOpen className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Document Setup — Claims</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Doc Code: 20-CL-01-001 (Fire Claims)</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Claim No Gen Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-rose outline-none">
                      <option>Setup</option>
                      <option>Automatic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Accounting Mode</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-rose outline-none">
                      <option>Batch</option>
                      <option>Online</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Cover Eff. Date Validation</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-rose outline-none">
                      <option>Loss Date</option>
                      <option>Intimation Date</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Estimate Applicable Currency</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-rose outline-none">
                      <option>Risk Currency</option>
                      <option>Base Currency</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Default Recovery Estimate Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-rose outline-none">
                      <option>3000001 — EXCESS/DEDUCTIBLE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Configuration Flags</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Account Estimation in Claim Req.</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Loss Date Validation Required</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Loss Desc Modifiable YN</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Generate Coins A/C</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Generate Claim A/C</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-rose" defaultChecked /> Dflt Assured address to loss loc. YN</label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'gl_codes' && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-aos-amber/10 rounded-md text-aos-amber"><KeySquare className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-slate-800">Transaction Codes Master</h3>
                </div>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-md">Code: RVB100 (Receipt Voucher Bank TZS)</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Transaction Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-amber outline-none">
                      <option>R — RECEIPTS</option>
                      <option>P — PAYMENTS</option>
                      <option>J — JOURNALS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Exchange Rate Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-amber outline-none">
                      <option>B — Buying</option>
                      <option>S — Selling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Authorization Type</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-amber outline-none">
                      <option>2 — Horizontal Any</option>
                      <option>1 — Sequential</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="cbo" className="text-aos-amber" /> Cash</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="cbo" className="text-aos-amber" defaultChecked /> Bank</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="cbo" className="text-aos-amber" /> Others</label>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Flex Fields Validation</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-xs font-semibold">Sr#</TableHead>
                          <TableHead className="text-xs font-semibold">Caption</TableHead>
                          <TableHead className="text-xs font-semibold">Data Type</TableHead>
                          <TableHead className="text-xs font-semibold">Length</TableHead>
                          <TableHead className="text-xs font-semibold">Disp?</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs">3</TableCell>
                          <TableCell className="text-sm">Insured Code</TableCell>
                          <TableCell className="text-sm">Character</TableCell>
                          <TableCell className="text-sm">240</TableCell>
                          <TableCell><input type="checkbox" className="rounded text-aos-amber" defaultChecked /></TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs">4</TableCell>
                          <TableCell className="text-sm">Insured Name</TableCell>
                          <TableCell className="text-sm">Character</TableCell>
                          <TableCell className="text-sm">240</TableCell>
                          <TableCell><input type="checkbox" className="rounded text-aos-amber" defaultChecked /></TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs">5</TableCell>
                          <TableCell className="text-sm">Bank Name</TableCell>
                          <TableCell className="text-sm">Character</TableCell>
                          <TableCell className="text-sm">240</TableCell>
                          <TableCell><input type="checkbox" className="rounded text-aos-amber" defaultChecked /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

              </div>
            </Card>
          )}

          {!detailedTabs.includes(activeTab) && (
            <Card className="shadow-sm border-slate-200 animate-in fade-in duration-300 h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50/50">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{getActiveTabTitle()}</h3>
              <p className="text-slate-500 max-w-md">
                This configuration module is currently under development. Detailed setup interfaces for this master will be available in the next release.
              </p>
              <button className="mt-6 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                View Database Schema
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
