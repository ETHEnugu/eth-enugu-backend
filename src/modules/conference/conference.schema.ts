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
  "STUDENT",
  "DEVELOPER",
  "DESIGNER",
  "ENTREPRENEUR",
  "WEB3_ENTHUSIAST",
  "OTHER",
]);

export const AttendanceTypeEnum = z.enum([
  "ATTENDEE",
  "VOLUNTEER",
  "SPEAKER",
  "EXHIBITOR",
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
  location: z.string().min(3, "Location is required"),
  age: AgeRangeEnum,
  gender: GenderEnum,
  preferredDates: z.array(z.string().datetime()),

  // Conference Information (Page 2)
  roleDescription: RoleDescriptionEnum,
  expectedGains: z.string().optional().nullable(),
  attendanceType: AttendanceTypeEnum,
  certificateNeeded: BooleanEnum,

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
export type AgeRange = z.infer<typeof AgeRangeEnum>;
export type RoleDescription = z.infer<typeof RoleDescriptionEnum>;
export type AttendanceType = z.infer<typeof AttendanceTypeEnum>;
export type JoinCommunityOption = z.infer<typeof JoinCommunityOptionEnum>;
export type RegistrationStatus = z.infer<typeof RegistrationStatusEnum>;
export type ConferenceSummitRegistration = z.infer<
  typeof conferenceSummitSchema
>;
