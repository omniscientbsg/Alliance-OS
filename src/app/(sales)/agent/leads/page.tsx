import React from 'react';
import { Card } from "@/components/ui/card";

export default function AgentLeads() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sales Pipeline</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your active leads and quotes.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Kanban Columns */}
        {['New Leads', 'Contacted', 'Quoted', 'Closing'].map((stage, idx) => (
          <div key={idx} className="bg-slate-100 rounded-xl p-3 min-h-[500px]">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 px-1">{stage}</h3>
            
            {idx === 0 && (
              <Card className="p-3 mb-3 cursor-grab hover:border-aos-blue transition-colors shadow-sm">
                <p className="text-sm font-semibold">Tech Innovations Ltd</p>
                <p className="text-xs text-slate-500 mb-2">Corporate • Health Group</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-aos-blue/10 text-aos-blue px-2 py-0.5 rounded font-medium">Hot</span>
                  <span className="text-xs text-slate-400">Today</span>
                </div>
              </Card>
            )}
            {idx === 2 && (
              <Card className="p-3 mb-3 cursor-grab hover:border-aos-blue transition-colors shadow-sm border-l-2 border-l-aos-amber">
                <p className="text-sm font-semibold">Logistics Pro Ltd</p>
                <p className="text-xs text-slate-500 mb-2">Motor Fleet • Q11/1021</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-semibold text-slate-700">TZS 8.5M</span>
                  <span className="text-xs text-slate-400">Sent 2d ago</span>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
