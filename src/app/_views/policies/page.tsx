"use client";

import { Button } from "@/components/ui/button";
import { PoliciesDataTable } from "./data-table";
import { useTabStore, Tab } from "@/lib/store";

export default function PoliciesView() {
  const { addTab } = useTabStore();

  const handleCreatePolicy = () => {
    const newTab: Tab = {
      id: `policy-create-${Date.now()}`,
      title: "New Policy",
      href: "/policies/create",
    };
    addTab(newTab);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Policies</h1>
        <Button onClick={handleCreatePolicy}>Create Policy</Button>
      </div>
      <PoliciesDataTable />
    </div>
  );
}
