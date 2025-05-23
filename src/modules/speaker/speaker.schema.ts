import { z } from "zod";

// Enums matching Prisma schema
export const SessionTypeEnum = z.enum([
  "TALK",
  "PANEL",
  "WORKSHOP",
  "FIRESIDE_CHAT",
  "OTHER",
]);

export const SessionLengthEnum = z.enum([
  "MINUTES_15",
  "MINUTES_30",
  "MINUTES_45",
  "MINUTES_60",
]);

export const JoinCommunityOptionEnum = z.enum(["YES", "NO", "ALREADY_MEMBER"]);

export const ApplicationStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

// Single comprehensive schema for the entire form
export const speakerApplicationSchema = z.object({
  // Personal Information (Page 1)
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  location: z.string().min(3, "Location is required"),
  twitterProfile: z.string().optional().nullable(),
  linkedinProfile: z.string().min(1, "LinkedIn profile is required"),
  website: z.string().url("Must be a valid URL").optional().nullable(),

  // Session Information (Page 2)
  sessionType: SessionTypeEnum,
  sessionLength: SessionLengthEnum,
  presentationAvailable: z.boolean(),
  presentationLink: z.string().url("Must be a valid URL").optional().nullable(),
  setupRequirements: z.string().optional().nullable(),
  talkTitle: z.string().optional().nullable(),
  talkDescription: z.string().optional().nullable(),

  // Travel Information (Page 3)
  expectedArrivalDate: z.string().optional().nullable(),
  willingToSpeakWithoutSupport: z.boolean(),
  referralSource: z
    .string()
    .min(3, "Please let us know how you heard about us"),
  joinOnlineCommunity: JoinCommunityOptionEnum,
});

// Schema for updating application status
export const updateStatusSchema = z.object({
  id: z.string(),
  status: ApplicationStatusEnum,
});

// Schema for getting an application by ID
export const getApplicationSchema = z.object({
  id: z.string(),
});

// Schema for filtering applications
export const filterApplicationsSchema = z.object({
  status: ApplicationStatusEnum.optional(),
  sessionType: SessionTypeEnum.optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

// Types derived from Zod schemas
export type SessionType = z.infer<typeof SessionTypeEnum>;
export type SessionLength = z.infer<typeof SessionLengthEnum>;
export type JoinCommunityOption = z.infer<typeof JoinCommunityOptionEnum>;
export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;
export type SpeakerApplication = z.infer<typeof speakerApplicationSchema>;
