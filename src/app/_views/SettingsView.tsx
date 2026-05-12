import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Shield, Building, Globe, Database, Key, Bell, Save } from "lucide-react";

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'branch', label: 'Branch Settings', icon: Building },
    { id: 'security', label: 'Security & Roles', icon: Shield },
    { id: 'system', label: 'System Config', icon: Database },
    { id: 'integrations', label: 'API Integrations', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage user preferences, branch configurations, and global system parameters.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 items-start">
        {/* Settings Sidebar */}
        <Card className="w-full md:w-64 shrink-0 shadow-sm border-slate-200 overflow-hidden sticky top-0">
          <div className="flex flex-col p-2 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-aos-blue/10 text-aos-blue' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-aos-blue' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Settings Content Area */}
        <Card className="flex-1 shadow-sm border-slate-200">
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
                  <p className="text-sm text-slate-500">Update your account details and profile picture.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" defaultValue="Kalemera Jason" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" defaultValue="jason.k@alliance.co.tz" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Role</label>
                    <input type="text" disabled defaultValue="System Administrator" className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Primary Branch</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20">
                      <option>Dar Es Salaam (100)</option>
                      <option>Arusha (200)</option>
                      <option>Mwanza (300)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab !== 'profile' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Configuration Locked</h3>
                <p className="text-sm text-slate-500 max-w-sm mt-2">This configuration module requires master administrative privileges to modify. Please contact IT support.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
