import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ClientDetailsStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Label htmlFor="client-search">Search Existing Client</Label>
            <Input id="client-search" placeholder="Search by name or code..." />
        </div>
        <div className="text-center text-sm text-slate-500">OR</div>
        <div>
            <Label htmlFor="new-client-name">Create New Client</Label>
            <Input id="new-client-name" placeholder="Enter new client name..." />
        </div>
      </CardContent>
    </Card>
  );
}
