"use client";

import React from "react";
import DashboardView from "@/app/_views/DashboardView";
import PoliciesView from "@/app/_views/PoliciesView";
import ClaimsView from "@/app/_views/ClaimsView";
import CustomersView from "@/app/_views/CustomersView";
import FinanceView from "@/app/_views/FinanceView";
import ReinsuranceView from "@/app/_views/ReinsuranceView";
import AnalyticsView from "@/app/_views/AnalyticsView";
import MastersView from "@/app/_views/MastersView";
import ApprovalsView from "@/app/_views/ApprovalsView";
import SettingsView from "@/app/_views/SettingsView";
import BrokerPortalView from "@/app/_views/BrokerPortalView";

// We will render placeholders for unknown views for now
const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
    <div className="text-center">
      <h2 className="text-lg font-medium text-slate-900">{title} Module</h2>
      <p className="mt-1 text-sm text-slate-500">This module is under construction.</p>
    </div>
  </div>
);

export default function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = React.use(params);
  const path = '/' + (resolvedParams.slug?.join('/') || '');
  
  // This is a simplified router for the prototype
  const renderContent = () => {
    if (path.startsWith('/policies')) return <PoliciesView />;
    if (path.startsWith('/claims')) return <ClaimsView />;
    if (path.startsWith('/finance')) return <FinanceView />;
    if (path.startsWith('/reinsurance')) return <ReinsuranceView />;
    if (path.startsWith('/customers')) return <CustomersView />;
    if (path.startsWith('/masters')) return <MastersView />;
    if (path.startsWith('/approvals')) return <ApprovalsView />;
    if (path.startsWith('/analytics')) return <AnalyticsView />;
    if (path.startsWith('/settings')) return <SettingsView />;
    if (path.startsWith('/broker')) return <BrokerPortalView />;
    
    if (path.startsWith('/dashboard') || path === '/') {
      return <DashboardView />;
    }

    return <PlaceholderView title={path.substring(1)} />;
  };

  return renderContent();
}
