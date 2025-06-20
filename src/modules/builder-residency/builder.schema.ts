import { z } from "zod";
import { AgeRangeEnum } from "../conference/conference.schema";

// Enums matching Prisma schema
export const GenderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);
export const PrimaryRoleEnum = z.enum([
  "DEVELOPER",
  "DESIGNER",
  "FOUNDER",
  "RESEARCHER",
  "OTHER",
]);
export const ApplicationStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const PreviousBuilderProgramsEnum = z.enum([
  "YES_BUILDER_RESIDENCY",
  "YES_POP_CITY",
  "YES_HACKATHON",
  "NO",
]);

// Single comprehensive schema for the entire form
export const builderResidencySchema = z.object({
  // Personal Information (Page 1)
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  gender: GenderEnum,
  age: AgeRangeEnum,
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  country: z.string().min(3, "Country is required"),
  state: z.string().min(3, "State of residence is required"),
  city: z.string().optional(),
  walletAddress: z.string(),
  githubProfile: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  social: z.string().min(3, "Social profile is required"),
  portfolioUrl: z.string().optional(),

  // Background Information (Page 2)
  primaryRole: z.array(z.string()),
  otherPrimaryRole: z.string().optional(),
  backgroundAndSkills: z
    .string()
    .min(10, "Please share more about your background"),
  currentlyBuilding: z
    .string()
    .min(3, "Please answer if you are currently building something"),
  previousBuilderPrograms: z.array(PreviousBuilderProgramsEnum),
  hasRegisteredForTheHackathon: z.boolean(),

  // Residency Information (Page 3)
  joinReason: z.string().min(10, "Please explain why you want to join"),
  comfortableSharingAccomodation: z.boolean(),
  dietaryAccessibilityNeeds: z.string().optional(),
  willBeLive: z.boolean(),
  needCertificate: z.boolean(),
  referralSource: z
    .string()
    .min(3, "Please let us know how you heard about us"),
});

// Schema for updating application status
export const updateStatusSchema = z.object({
  id: z.string(),
  status: ApplicationStatusEnum,
});

// Schema for getting a residency by ID
export const getResidencySchema = z.object({
  id: z.string(),
});

// Schema for filtering residencies
export const filterResidencySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

// Types derived from Zod schemas
export type Gender = z.infer<typeof GenderEnum>;
export type PrimaryRole = z.infer<typeof PrimaryRoleEnum>;
export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;
export type BuilderResidencyApplication = z.infer<
  typeof builderResidencySchema
>;
