import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Plus, Search, Layers, Calculator, FileText, ArrowRightLeft, Shield, Save, GitBranch, FileCode2, BookOpen, KeySquare } from "lucide-react";

export default function MastersView() {
  const [activeTab, setActiveTab] = useState('product');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <button 
            onClick={() => setActiveTab('product')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'product' ? 'bg-aos-purple/10 text-aos-purple border-aos-purple/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <Layers className={`w-4 h-4 ${activeTab === 'product' ? 'text-aos-purple' : 'text-slate-400'}`} /> Product & Flex Setup
          </button>
          <button 
            onClick={() => setActiveTab('rating')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'rating' ? 'bg-aos-purple/10 text-aos-purple border-aos-purple/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <Calculator className={`w-4 h-4 ${activeTab === 'rating' ? 'text-aos-purple' : 'text-slate-400'}`} /> Rating Engine
          </button>
          <button 
            onClick={() => setActiveTab('tax')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'tax' ? 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'tax' ? 'text-aos-amber' : 'text-slate-400'}`} /> Tax & Charges
          </button>
          <button 
            onClick={() => setActiveTab('ri')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'ri' ? 'bg-aos-coral/10 text-aos-coral border-aos-coral/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <ArrowRightLeft className={`w-4 h-4 ${activeTab === 'ri' ? 'text-aos-coral' : 'text-slate-400'}`} /> RI Treaties (XOL)
          </button>
          <button 
            onClick={() => setActiveTab('doc_policy')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'doc_policy' ? 'bg-aos-blue/10 text-aos-blue border-aos-blue/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <FileCode2 className={`w-4 h-4 ${activeTab === 'doc_policy' ? 'text-aos-blue' : 'text-slate-400'}`} /> Policy Docs Setup
          </button>
          <button 
            onClick={() => setActiveTab('doc_claims')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'doc_claims' ? 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'doc_claims' ? 'text-aos-rose' : 'text-slate-400'}`} /> Claims Docs Setup
          </button>
          <button 
            onClick={() => setActiveTab('gl_codes')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors flex items-center gap-3 ${activeTab === 'gl_codes' ? 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
          >
            <KeySquare className={`w-4 h-4 ${activeTab === 'gl_codes' ? 'text-aos-amber' : 'text-slate-400'}`} /> GL Transaction Codes
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
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
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Target Database Table</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700" value="PGIT_POL_RISK_ADDL_INFO" readOnly />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Block Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700" value="PGIT_POL_RISK_ADDL_INFO_01" readOnly />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">UI Label</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:border-aos-purple outline-none" defaultValue="Risk Details" />
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
        </div>
      </div>
    </div>
  );
}
