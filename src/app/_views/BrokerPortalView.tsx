import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Briefcase, FileText, Download, TrendingUp, CheckCircle2, Search, ArrowUpRight } from "lucide-react";

export default function BrokerPortalView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Broker Portal</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-aos-blue/10 text-aos-blue text-xs font-bold uppercase tracking-wide">External View</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Marsh & McLennan Tanzania.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <FileText className="w-4 h-4" /> New Quote Request
          </button>
          <button className="px-4 py-2 bg-aos-emerald text-white rounded-lg text-sm font-medium hover:bg-aos-emerald/90 transition-colors shadow-sm shadow-aos-emerald/20 flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Statement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 shadow-sm flex flex-col justify-between bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-aos-blue/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Policies</p>
            <p className="text-3xl font-bold text-slate-900">4,250</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="flex items-center text-aos-emerald font-medium bg-aos-emerald/10 px-1.5 py-0.5 rounded text-xs"><ArrowUpRight className="w-3 h-3 mr-0.5" /> 12%</span>
            <span className="text-slate-400 text-xs">vs last quarter</span>
          </div>
        </Card>
        
        <Card className="p-5 border-slate-200 shadow-sm flex flex-col justify-between bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-aos-emerald/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total GWP (YTD)</p>
            <p className="text-3xl font-bold text-slate-900">TZS 8.5B</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="flex items-center text-aos-emerald font-medium bg-aos-emerald/10 px-1.5 py-0.5 rounded text-xs"><ArrowUpRight className="w-3 h-3 mr-0.5" /> 8%</span>
            <span className="text-slate-400 text-xs">vs last year</span>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 shadow-sm flex flex-col justify-between bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-aos-amber/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Earned Commission</p>
            <p className="text-3xl font-bold text-slate-900">TZS 1.2B</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-slate-400 text-xs">14.1% avg. comm rate</span>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 shadow-sm flex flex-col justify-between bg-slate-900 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Unpaid Commission</p>
            <p className="text-3xl font-bold text-white">TZS 320M</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-400 text-xs">Requires invoice upload</span>
            <button className="text-xs text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">Settle Now</button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-slate-200 h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
              <h3 className="font-semibold text-slate-800">Recent Policies</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search clients..." 
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-aos-blue"
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-xs font-semibold">Policy No</TableHead>
                    <TableHead className="text-xs font-semibold">Client Name</TableHead>
                    <TableHead className="text-xs font-semibold">Product</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Premium (TZS)</TableHead>
                    <TableHead className="text-xs font-semibold text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell className="font-medium text-aos-blue text-sm">P11/2026/100/5042</TableCell>
                    <TableCell className="text-slate-900 text-sm">Acme Corp Ltd</TableCell>
                    <TableCell className="text-slate-600 text-sm">Fire & Perils</TableCell>
                    <TableCell className="text-right font-medium text-slate-700 text-sm">4,500,000</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-aos-emerald/10 text-aos-emerald">Active</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell className="font-medium text-aos-blue text-sm">P11/2026/100/5043</TableCell>
                    <TableCell className="text-slate-900 text-sm">Global Industries</TableCell>
                    <TableCell className="text-slate-600 text-sm">Marine Cargo</TableCell>
                    <TableCell className="text-right font-medium text-slate-700 text-sm">12,200,000</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-aos-emerald/10 text-aos-emerald">Active</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell className="font-medium text-aos-blue text-sm">Q11/2026/100/1021</TableCell>
                    <TableCell className="text-slate-900 text-sm">Logistics Pro Ltd</TableCell>
                    <TableCell className="text-slate-600 text-sm">Motor Fleet</TableCell>
                    <TableCell className="text-right font-medium text-slate-700 text-sm">8,500,000</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-aos-amber/10 text-aos-amber">Quoted</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                    <TableCell className="font-medium text-aos-blue text-sm">P11/2026/100/5011</TableCell>
                    <TableCell className="text-slate-900 text-sm">Dar Construct</TableCell>
                    <TableCell className="text-slate-600 text-sm">CAR</TableCell>
                    <TableCell className="text-right font-medium text-slate-700 text-sm">24,000,000</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">Expired</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="p-3 border-t border-slate-100 text-center">
              <button className="text-sm font-medium text-aos-blue hover:underline">View All Policies</button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
              <h3 className="font-semibold text-slate-800">Portfolio Mix</h3>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#0072CE" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#00B08B" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-20" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#F1A02F" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-50" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <PieChart className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-aos-blue"></div><span className="text-slate-600">Motor Fleet</span></div>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-aos-emerald"></div><span className="text-slate-600">Fire & Property</span></div>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-aos-amber"></div><span className="text-slate-600">Marine</span></div>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
