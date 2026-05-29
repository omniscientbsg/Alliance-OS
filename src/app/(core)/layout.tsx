import React from "react";
import TabbedLayout from "@/components/layout/TabbedLayout";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TabbedLayout>{children}</TabbedLayout>;
}
