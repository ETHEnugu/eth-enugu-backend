import { z } from "zod";

// Enums matching Prisma schema
export const GenderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const AgeRangeEnum = z.enum([
  "AGE_16_19",
  "AGE_20_24",
  "AGE_25_34",
  "AGE_35_44",
  "AGE_45_PLUS",
]);

export const RoleDescriptionEnum = z.enum([
  "STUDENTS",
  "WEB_3_ENTHUSIAST",
  "BLOCKCHAIN_DEVELOPER_ENGINEER",
  "CORE_PROTOCOL_ENGINEER",
  "FRONTEND_BACKEND_FULLSTACK_DEVELOPER",
  "TECHNICAL_WRITER",
  "RESEARCHERS",
  "NODE_RUNNERS_AND_OPERATORS",
  "WEB3_SECURITY_AND_AUDITORS",
  "GENERAL_BLOCKCHAIN_CRYPTO_ENTHUSIAST",
  "CONTENT_CREATORS_AND_CONTENT_WRITERS",
  "UI_UX_AND_CREATIVE_DESIGNERS",
  "COMMUNITY_SOCIAL_MEDIA_MANAGER",
  "WEB3_COMMUNITY_LEADER",
  "CRYPTO_TRADERS_DEGENS",
  "OTHER",
]);

export const BooleanEnum = z.enum(["YES", "NO"]);

export const JoinCommunityOptionEnum = z.enum(["YES", "NO", "ALREADY_MEMBER"]);

export const RegistrationStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

// Single comprehensive schema for the entire form
export const conferenceSummitSchema = z.object({
  // Personal Information (Page 1)
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  country: z.string().min(3, "Country is required"),
  state: z.string().min(3, "State is required"),
  city: z.string().optional(),
  gender: GenderEnum,
  social: z.string().url(),
  walletAddress: z.string().optional(),

  // Conference Information (Page 2)
  roleDescription: z.array(RoleDescriptionEnum),
  certificateNeeded: BooleanEnum,
  openToVolunteer: z.boolean(),
  willBeLive: z.boolean(),

  // Additional Information (Page 2)
  referralSource: z
    .string()
    .min(3, "Please let us know how you heard about us"),
});

// Schema for updating registration status
export const updateStatusSchema = z.object({
  id: z.string(),
  status: RegistrationStatusEnum,
});

// Schema for getting a registration by ID
export const getRegistrationSchema = z.object({
  id: z.string(),
});

// Schema for filtering registrations
export const filterRegistrationsSchema = z.object({
  status: RegistrationStatusEnum.optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

// Types derived from Zod schemas
export type Gender = z.infer<typeof GenderEnum>;
export type AgeRange = z.infer<typeof AgeRangeEnum>;
export type RoleDescription = z.infer<typeof RoleDescriptionEnum>;
export type JoinCommunityOption = z.infer<typeof JoinCommunityOptionEnum>;
export type RegistrationStatus = z.infer<typeof RegistrationStatusEnum>;
export type ConferenceSummitRegistration = z.infer<
  typeof conferenceSummitSchema
>;
