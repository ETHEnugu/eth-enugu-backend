import { z } from "zod";

// Enums matching Prisma schema
export const GenderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const CurrentRoleEnum = z.enum([
  "STUDENT",
  "DEVELOPER",
  "DESIGNER",
  "ENTREPRENEUR",
  "WEB3_ENTHUSIAST",
  "OTHER",
]);

export const Web3FamiliarityEnum = z.enum([
  "NEW",
  "DABBLED",
  "ACTIVELY_BUILDING",
]);

export const VolunteerOptionEnum = z.enum(["YES", "NO", "MAYBE"]);

export const JoinCommunityOptionEnum = z.enum(["YES", "NO", "ALREADY_MEMBER"]);

export const RegistrationStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

// Single comprehensive schema for the entire form
export const popupCitySchema = z.object({
  // Personal Information (Page 1)
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  gender: GenderEnum,
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  location: z.string().min(3, "Location is required"),

  // Background Information (Page 1)
  currentRole: CurrentRoleEnum,
  web3Familiarity: Web3FamiliarityEnum,

  // Event Information (Page 2)
  attendDay1: z.string().optional().nullable(),
  attendDay2: z.string().optional().nullable(),
  freeLunchConsideration: z.string().optional().nullable(),
  volunteeringInterest: VolunteerOptionEnum,

  // Additional Information (Page 2)
  dietaryAccessibilityNeeds: z.string().optional().nullable(),
  referralSource: z
    .string()
    .min(3, "Please let us know how you heard about us"),
  joinOnlineCommunity: JoinCommunityOptionEnum,
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
export type CurrentRole = z.infer<typeof CurrentRoleEnum>;
export type Web3Familiarity = z.infer<typeof Web3FamiliarityEnum>;
export type VolunteerOption = z.infer<typeof VolunteerOptionEnum>;
export type JoinCommunityOption = z.infer<typeof JoinCommunityOptionEnum>;
export type RegistrationStatus = z.infer<typeof RegistrationStatusEnum>;
export type PopupCityRegistration = z.infer<typeof popupCitySchema>;
