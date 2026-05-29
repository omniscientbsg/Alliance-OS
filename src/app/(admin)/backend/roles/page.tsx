import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, Key } from "lucide-react";

export default function AdminRoles() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">RBAC & Identity</h1>
        <p className="text-sm text-slate-500 mt-1">Manage system roles, permissions, and audit logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-800 shadow-sm bg-slate-900">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-aos-blue" /> Defined Roles</h3>
            <button className="text-xs bg-aos-blue/20 text-aos-blue px-2 py-1 rounded">Create Role</button>
          </div>
          <div className="divide-y divide-slate-800">
            <div className="p-4 hover:bg-slate-800/50 cursor-pointer">
              <div className="flex justify-between">
                <p className="font-medium text-white text-sm">Super Administrator</p>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 rounded">12 Users</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Full access to all Alliance OS modules and settings.</p>
            </div>
            <div className="p-4 hover:bg-slate-800/50 cursor-pointer">
              <div className="flex justify-between">
                <p className="font-medium text-white text-sm">Underwriter L3</p>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 rounded">45 Users</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Can approve quotes up to TZS 500M without override.</p>
            </div>
            <div className="p-4 hover:bg-slate-800/50 cursor-pointer">
              <div className="flex justify-between">
                <p className="font-medium text-white text-sm">Claims Manager</p>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 rounded">18 Users</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Can approve settlements up to TZS 50M.</p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-800 shadow-sm bg-slate-900">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-semibold text-white flex items-center gap-2"><Key className="w-4 h-4 text-aos-amber" /> Recent Audit Logs</h3>
          </div>
          <div className="p-0">
            <div className="divide-y divide-slate-800 text-sm">
              <div className="p-3 font-mono">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>2026-05-29 10:42:11</span>
                  <span>IP: 10.1.4.22</span>
                </div>
                <p className="text-white"><span className="text-emerald-400">auth_success</span> User jsmith logged in.</p>
              </div>
              <div className="p-3 font-mono">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>2026-05-29 10:35:05</span>
                  <span>IP: 10.1.5.12</span>
                </div>
                <p className="text-white"><span className="text-aos-amber">role_update</span> Admin changed permission for UW_L2.</p>
              </div>
              <div className="p-3 font-mono">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>2026-05-29 10:11:42</span>
                  <span>IP: 10.1.2.99</span>
                </div>
                <p className="text-white"><span className="text-aos-rose">auth_failed</span> 3 failed attempts for user admin.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
