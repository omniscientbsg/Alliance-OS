"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Building, ShieldAlert, Target, HeartHandshake, LogIn } from "lucide-react";

export default function Login() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleLogin = (role: string) => {
    switch(role) {
      case 'broker':
        setUser({ id: 'B001', name: 'Marsh & McLennan', role: 'broker', branch: 'External', branchCode: 'EXT' });
        router.push('/partner');
        break;
      case 'agent':
        setUser({ id: 'A045', name: 'Sarah Jenkins', role: 'agent', branch: 'Direct Sales', branchCode: 'DS' });
        router.push('/agent');
        break;
      case 'it_admin':
        setUser({ id: 'SYS', name: 'System Admin', role: 'it_admin', branch: 'HQ', branchCode: '100' });
        router.push('/backend');
        break;
      case 'core':
      default:
        setUser({ id: 'U100', name: 'Kalemera Jason', role: 'underwriter', branch: 'Dar Es Salaam', branchCode: '100' });
        router.push('/');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-gradient-to-br from-aos-blue to-aos-emerald mb-4">
            <span className="font-bold text-white text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Alliance OS</h1>
          <p className="text-slate-500 mt-2">Select your portal to log in</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Core Staff */}
          <Card 
            className="p-6 cursor-pointer hover:border-aos-blue hover:shadow-md transition-all group bg-white border-slate-200"
            onClick={() => handleLogin('core')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-aos-blue/10 text-aos-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Core Operations</h3>
                <p className="text-sm text-slate-500">Underwriters, Claims, Finance</p>
              </div>
            </div>
          </Card>

          {/* Broker */}
          <Card 
            className="p-6 cursor-pointer hover:border-aos-emerald hover:shadow-md transition-all group bg-white border-slate-200"
            onClick={() => handleLogin('broker')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-aos-emerald/10 text-aos-emerald flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Partner Portal</h3>
                <p className="text-sm text-slate-500">Brokers & External Partners</p>
              </div>
            </div>
          </Card>

          {/* Sales */}
          <Card 
            className="p-6 cursor-pointer hover:border-aos-amber hover:shadow-md transition-all group bg-white border-slate-200"
            onClick={() => handleLogin('agent')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-aos-amber/10 text-aos-amber flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Sales Portal</h3>
                <p className="text-sm text-slate-500">Direct Agents & Sales Teams</p>
              </div>
            </div>
          </Card>

          {/* IT Admin */}
          <Card 
            className="p-6 cursor-pointer hover:border-slate-800 hover:shadow-md transition-all group bg-slate-900 border-slate-800 text-white"
            onClick={() => handleLogin('it_admin')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">IT Admin Console</h3>
                <p className="text-sm text-slate-400">System Setup & RBAC</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
          <LogIn className="w-4 h-4" /> This is a mock authentication interface for the prototype.
        </div>
      </div>
    </div>
  );
}
