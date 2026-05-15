"use client";

import { useTabStore, useNotificationStore, useUserStore, Tab } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { X, Plus, Bell, Search, Menu, Command, Bot, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CoPilotSidebar } from "../ai/CoPilotSidebar";
import { AllianceAIOmnibar, useOmnibar } from "../ai/AllianceAIOmnibar";

export default function TabbedLayout({ children }: { children: React.ReactNode }) {
  const { tabs, activeTab, addTab, removeTab, setActiveTab } = useTabStore();
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationStore();
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  
  const [mounted, setMounted] = useState(false);
  const [isCoPilotOpen, setIsCoPilotOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const omnibar = useOmnibar();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const activeTabData = tabs.find(t => t.id === activeTab);
    if (activeTabData) {
      router.push(activeTabData.href);
    }
  }, [activeTab, tabs, router, mounted]);

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: Tab = { id: newId, title: `New Workspace`, href: `/` };
    addTab(newTab);
  };

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
  };

  // Prevent hydration mismatch for zustand stores
  if (!mounted) {
    return <div className="h-screen w-full bg-aos-navy flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-aos-blue border-t-transparent animate-spin"></div>
    </div>;
  }
  
  return (
    <div className={`flex h-screen overflow-hidden font-sans ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Persistent Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 min-w-0 overflow-hidden relative ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        
        {/* Top Header Bar */}
        <header className={`h-16 border-b flex items-center justify-between px-6 shrink-0 z-10 shadow-sm relative ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          
          {/* Omnibar Trigger */}
          <div className="flex-1 max-w-xl">
            <button
              onClick={() => window.dispatchEvent(new Event('open-omnibar'))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left group ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200/70 text-slate-500'
              }`}
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="flex-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Search, navigate, or ask Alliance AI...</span>
              <kbd className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${
                isDarkMode ? 'border-slate-600 bg-slate-700 text-slate-400' : 'border-slate-200 bg-white text-slate-400'
              }`}>
                <Command className="h-3 w-3" /> K
              </kbd>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto pl-4">
            {/* Environment Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-aos-amber-glow border border-aos-amber/20 text-aos-amber text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aos-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-aos-amber"></span>
              </span>
              UAT ENV
            </div>

            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-aos-blue/30 ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={() => setIsCoPilotOpen(true)}
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-indigo-400' : 'hover:bg-slate-100 text-slate-500 hover:text-indigo-600'}`}
              title="Open CoPilot"
            >
              <Bot className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-aos-blue-glow">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-aos-rose ring-2 ring-white"></span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-aos-blue hover:text-aos-blue/80 font-medium">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => markRead(notif.id)}
                        className={cn(
                          "px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors",
                          !notif.read ? "bg-slate-50/50" : ""
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-0.5 w-2 h-2 rounded-full shrink-0",
                            !notif.read ? "bg-aos-blue" : "bg-transparent"
                          )} />
                          <div>
                            <p className="text-sm font-medium text-slate-900 leading-tight mb-1">{notif.title}</p>
                            <p className="text-xs text-slate-500 mb-2">{notif.message}</p>
                            <span className="text-[10px] font-medium text-slate-400">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-sm text-slate-500">No notifications</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Dynamic Tab Bar (Replacing MDI Windowing) */}
        <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-2 shrink-0 overflow-x-auto scrollbar-hide shadow-inner">
          <div className="flex space-x-1 h-full py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group flex items-center h-full px-3 min-w-[120px] max-w-[200px] rounded-t-md border-x border-t cursor-pointer transition-all select-none relative",
                    isActive
                      ? "bg-white border-slate-200 text-aos-blue shadow-[0_2px_0_0_#fff] z-10"
                      : "bg-transparent border-transparent text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
                  )}
                >
                  {isActive && <div className="absolute top-0 left-0 right-0 h-0.5 bg-aos-blue rounded-t-full" />}
                  <div className="w-2 h-2 rounded-full bg-slate-300 mr-2 group-hover:bg-slate-400 transition-colors shrink-0" />
                  <span className="text-xs font-medium truncate flex-1">{tab.title}</span>
                  
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab(tab.id);
                      }}
                      className={cn(
                        "ml-2 p-0.5 rounded-sm shrink-0 transition-opacity",
                        isActive 
                          ? "text-slate-400 hover:bg-slate-100 hover:text-rose-500 opacity-100" 
                          : "text-slate-400 hover:bg-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={handleAddTab} 
            className="ml-2 p-1.5 rounded text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            title="Open new workspace"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Scrollable View Content */}
        <main className={cn(
          "flex-1 overflow-y-auto page-enter relative",
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50',
          // If we are on a specific claim canvas page, remove padding for full-bleed
          pathname?.match(/\/claims\/C.*/) ? "p-0 overflow-hidden" : "p-6"
        )}>
          <div className={cn(
            "mx-auto h-full",
            pathname?.match(/\/claims\/C.*/) ? "max-w-none" : "max-w-7xl"
          )}>
            {children}
          </div>
        </main>
        
        <CoPilotSidebar 
          isOpen={isCoPilotOpen} 
          onClose={() => setIsCoPilotOpen(false)} 
        />
        <AllianceAIOmnibar 
          isOpen={omnibar.isOpen} 
          onClose={omnibar.close} 
        />
      </div>
    </div>
  );
}
