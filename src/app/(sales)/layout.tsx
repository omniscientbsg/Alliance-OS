import React from "react";
import { Users, LogOut, FileText, Settings, Target, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-aos-navy text-white h-16 flex items-center justify-between px-6 border-b border-aos-blue/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-aos-amber to-aos-rose">
            <span className="font-bold text-white text-lg">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Alliance Sales Portal</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/agent" className="hover:text-white transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/agent/leads" className="hover:text-white transition-colors flex items-center gap-2">
            <Target className="w-4 h-4" /> Pipeline
          </Link>
          <Link href="/agent/customers" className="hover:text-white transition-colors flex items-center gap-2">
            <Users className="w-4 h-4" /> CRM
          </Link>
          <Link href="/agent/quotes" className="hover:text-white transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Quick Quote
          </Link>
          <div className="w-px h-6 bg-slate-700"></div>
          <Link href="/login" className="hover:text-rose-400 transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Log out
          </Link>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
