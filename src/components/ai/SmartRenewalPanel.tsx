import React from 'react';
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertTriangle, UserCheck } from "lucide-react";

export function SmartRenewalPanel() {
  const recommendations = [
    { policyId: "P11/2025/100/5042", client: "Acme Corp", likelihood: "High (92%)", risk: "Low", action: "Auto-Renew with 5% Premium Increase", insight: "Zero claims in past 3 years. Client is highly price-inelastic for this product." },
    { policyId: "P11/2025/200/1008", client: "Global Industries", likelihood: "Medium (65%)", risk: "High", action: "Manual Review Required", insight: "Two large claims (TZS 150M) this term. Loss ratio exceeds 120%. Flagged for underwriter review." },
    { policyId: "P11/2025/300/4055", client: "City Construction", likelihood: "Low (30%)", risk: "Medium", action: "Offer Cross-Sell Bundle", insight: "Competitor activity detected. Recommend offering complimentary Marine Cargo cover to retain account." },
  ];

  return (
    <Card className="border-slate-200 shadow-sm p-5 bg-gradient-to-br from-white to-indigo-50/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">AI Renewal Insights</h3>
          <p className="text-xs text-slate-500">Predictive retention analytics</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-bold text-slate-900">{rec.client}</p>
                <p className="text-[10px] text-slate-500">{rec.policyId}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.likelihood.includes('High') ? 'bg-emerald-100 text-emerald-700' : rec.likelihood.includes('Medium') ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                Retention: {rec.likelihood}
              </span>
            </div>
            
            <p className="text-xs text-indigo-700 bg-indigo-50 p-2 rounded mb-2 leading-relaxed">
              <strong>Insight:</strong> {rec.insight}
            </p>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                {rec.risk === 'High' ? <AlertTriangle className="w-3 h-3 text-rose-500" /> : <UserCheck className="w-3 h-3 text-emerald-500" />}
                Risk: {rec.risk}
              </span>
              <button className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                {rec.action} <TrendingUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
