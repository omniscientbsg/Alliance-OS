"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebarStore, useUserStore } from "@/lib/store";
import { 
  Gauge, 
  Shield, 
  FileText, 
  HeartHandshake, 
  Building, 
  Users, 
  PieChart, 
  Briefcase, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from 'lucide-react';

const navItems = [
  { 
    group: "Overview",
    items: [
      { href: "/", label: "Mission Control", icon: Gauge },
      { href: "/analytics", label: "Analytics", icon: PieChart },
    ]
  },
  {
    group: "Core Modules",
    items: [
      { href: "/policies", label: "Policies", icon: Shield },
      { href: "/claims", label: "Claims", icon: FileText },
      { href: "/finance", label: "Finance & GL", icon: Briefcase },
      { href: "/reinsurance", label: "Reinsurance", icon: HeartHandshake },
    ]
  },
  {
    group: "Administration",
    items: [
      { href: "/customers", label: "Party Master", icon: Users },
      { href: "/masters", label: "System Setup", icon: Building },
      { href: "/approvals", label: "Approvals", icon: FileCheck },
    ]
  },
  {
    group: "Ecosystem",
    items: [
      { href: "/broker", label: "Broker Portal", icon: HeartHandshake },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const { user } = useUserStore();

  return (
    <aside 
      className={cn(
        "relative flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out border-r border-slate-800 z-20 shadow-xl",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-aos-blue to-aos-emerald shrink-0 glow-blue">
            <span className="font-bold text-white text-lg">A</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Alliance OS
            </span>
          )}
        </div>
        
        <button 
          onClick={toggleCollapsed}
          className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors absolute -right-3 top-4 bg-aos-navy border border-sidebar-border z-30"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* User Profile Summary */}
      <div className={cn(
        "p-4 border-b border-sidebar-border transition-all duration-300",
        collapsed ? "items-center" : ""
      )}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-slate-300">
              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">{user.name}</span>
              <span className="text-xs text-emerald-400 truncate">{user.branch} ({user.branchCode})</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {navItems.map((group, i) => (
          <div key={i} className="mb-6">
            {!collapsed && (
              <div className="px-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {group.group}
              </div>
            )}
            <nav className="flex flex-col space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-blue-500/15 text-blue-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" />
                    )}
                    <item.icon className={cn(
                      "shrink-0 transition-colors", 
                      collapsed ? "mx-auto h-5 w-5" : "mr-3 h-5 w-5",
                      isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300"
                    )} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex flex-col gap-1">
          <Link href="/settings" className="flex items-center justify-center lg:justify-start px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Settings className={cn("shrink-0 h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button className="flex items-center justify-center lg:justify-start px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors w-full">
            <LogOut className={cn("shrink-0 h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
