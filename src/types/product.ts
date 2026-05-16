import { z } from "zod";

export const RatingFactorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["Flat", "RateOnSumInsured", "RateOnPremium", "LookupTable"]),
  value: z.number().optional(),
});
export type RatingFactor = z.infer<typeof RatingFactorSchema>;

export const CoverSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  isMandatory: z.boolean(),
  ratingLogic: RatingFactorSchema,
});
export type Cover = z.infer<typeof CoverSchema>;

export const SectionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  covers: z.array(CoverSchema),
  deductible: z.number().optional(),
});
export type Section = z.infer<typeof SectionSchema>;

export const ProductVersionSchema = z.object({
  id: z.string().uuid(),
  versionNumber: z.number(),
  effectiveDate: z.string(),
  status: z.enum(["Draft", "Pending Approval", "Active", "Archived"]),
  sections: z.array(SectionSchema),
  globalDeductible: z.number().optional(),
  applicableTaxes: z.array(z.string()),
});
export type ProductVersion = z.infer<typeof ProductVersionSchema>;

export const ProductSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  versions: z.array(ProductVersionSchema),
  currentVersionId: z.string().uuid().optional(),
});
export type Product = z.infer<typeof ProductSchema>;
