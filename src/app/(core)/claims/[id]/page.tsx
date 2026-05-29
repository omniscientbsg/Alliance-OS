import ClaimCanvasView from "@/app/_views/ClaimCanvasView";

export default async function ClaimPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15+, params is a Promise
  const resolvedParams = await params;
  const id = resolvedParams?.id || "";
  
  // Hardcoding the display ID for the prototype based on the route
  const displayId = "C11/100/1002/2026/" + (id.split('-').pop() || '011702');
  
  return <ClaimCanvasView claimId={displayId} />;
}