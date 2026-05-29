import React from "react";
import { Server, LogOut, Users, ShieldAlert, Activity, Database } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-mono text-slate-300">
      <header className="bg-slate-900 h-14 flex items-center justify-between px-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-emerald-500" />
          <span className="text-lg font-bold tracking-tight text-white">IT Admin Console</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/backend" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" /> System Health
          </Link>
          <Link href="/backend/roles" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> RBAC & Logs
          </Link>
          <div className="w-px h-5 bg-slate-700"></div>
          <Link href="/login" className="hover:text-rose-400 transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Exit
          </Link>
        </div>
      </header>
      <main className="flex-1 p-6 w-full">
        {children}
      </main>
    </div>
  );
}
