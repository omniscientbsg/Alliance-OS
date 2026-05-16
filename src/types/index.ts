import { z } from "zod";

// --- CORE DOMAIN TYPES ---

export type EntityType = "Retail" | "Corporate" | "SME" | "Broker" | "Surveyor";
export type ClaimStatus = "FNOL" | "Triage" | "Assessment" | "Survey" | "Settlement" | "Closed" | "SIU";
export type PolicyStatus = "Active" | "Pending Bind" | "Lapsed" | "Cancelled";
export type FraudRisk = "Low" | "Medium" | "High";

// --- ZOD SCHEMAS ---

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["Retail", "Corporate", "SME", "Broker", "Surveyor"]),
  phone: z.string(),
  tin: z.string().optional(),
  activePolicies: z.number().default(0),
});
export type Customer = z.infer<typeof CustomerSchema>;

export const PolicySchema = z.object({
  id: z.string(),
  customerId: z.string(),
  productVersionId: z.string().uuid(),
  productName: z.string(),
  status: z.enum(["Active", "Pending Bind", "Lapsed", "Cancelled"]),
  inceptionDate: z.string(),
  expiryDate: z.string(),
  grossPremium: z.number(),
  assetRef: z.string(), // e.g. "T 412 EFZ" or "Warehouse A"
});
export type Policy = z.infer<typeof PolicySchema>;

export const ClaimSchema = z.object({
  id: z.string(),
  policyId: z.string(),
  customerId: z.string(),
  dateOfLoss: z.string(),
  status: z.enum(["FNOL", "Triage", "Assessment", "Survey", "Settlement", "Closed", "SIU"]),
  fraudScore: z.number().min(0).max(100),
  initialReserve: z.number().optional(),
  extractedData: z.array(z.object({
    field: z.string(),
    value: z.string(),
    confidence: z.number().min(0).max(100)
  })).optional()
});
export type Claim = z.infer<typeof ClaimSchema>;

// --- EVENT BUS PAYLOADS ---

export interface EventPayload<T = any> {
  eventId: string;
  eventType: string;
  timestamp: string;
  sourceModule: string;
  data: T;
}
