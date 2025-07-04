import { z } from "zod";

// Enums matching Prisma schema
export const GenderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const SpeakerRoleEnum = z.enum([
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

export const SessionTypeEnum = z.enum([
  "TALK",
  "PANEL",
  "WORKSHOP",
  "FIRESIDE_CHAT",
  "OTHER",
]);

export const SessionLengthEnum = z.enum([
  "MINUTES_5",
  "MINUTES_10",
  "MINUTES_15",
  "MINUTES_30",
  "MINUTES_45",
  "MINUTES_60",
]);

export const ParticipationTypeEnum = z.enum([
  "MENTOR_ONLY",
  "SPEAK_ONLY",
  "BOTH",
]);

export const ERVInvolvementEnum = z.enum([
  "LEARN_DURING_ERV",
  "MENTOR_DURING_ERV",
]);

export const ApplicationStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

// Single comprehensive schema for the entire form
export const speakerApplicationSchema = z
  .object({
    // Personal Information (Page 1)
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email address"),
    gender: GenderEnum,
    whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
    country: z.string().min(3, "Location is required"),
    state: z.string().min(3, "Please provide state"),
    city: z.string().optional(),
    social: z.string(),
    portfolioUrl: z.string(),
    bio: z.string().min(10, "Please provide a brief bio"),
    twitterProfile: z.string().optional().nullable(),
    linkedinProfile: z.string().optional().nullable(), // Made optional

    // Roles (handled as array with conditional other)
    roles: z.array(SpeakerRoleEnum).min(1, "Please select at least one role"),
    otherRole: z.string().optional(),

    // Participation type
    participationType: ParticipationTypeEnum,

    // Session Information (Page 2)
    sessionType: SessionTypeEnum,
    otherSessionType: z.string().optional(),
    sessionLength: SessionLengthEnum,
    presentationAvailable: z.boolean(),
    presentationLink: z.string().optional(),
    setupRequirements: z.string().optional().nullable(),
    talkTitle: z.string().optional().nullable(),
    talkDescription: z.string().optional().nullable(),
    comfortableWithTopicChange: z.boolean(),

    // Travel Information (Page 3)
    canMakeItToEnugu: z.boolean(),
    expectedArrivalDates: z.array(z.string().datetime()),
    // Ethereum Research Village
    participateInERV: z.boolean(),
    ervInvolvement: ERVInvolvementEnum.optional(),
  })
  .refine(
    (data) => {
      // If roles includes "OTHER", then otherRole is required
      if (data.roles.includes("OTHER")) {
        return data.otherRole && data.otherRole.trim().length >= 3;
      }
      return true;
    },
    {
      message: "Please specify your role when selecting 'OTHER'",
      path: ["otherRole"],
    }
  )
  .refine(
    (data) => {
      // If sessionType is "OTHER", then otherSessionType is required
      if (data.sessionType === "OTHER") {
        return (
          data.otherSessionType && data.otherSessionType.trim().length >= 3
        );
      }
      return true;
    },
    {
      message: "Please specify session type when selecting 'OTHER'",
      path: ["otherSessionType"],
    }
  );

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
  participationType: ParticipationTypeEnum.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

// Types derived from Zod schemas
export type Gender = z.infer<typeof GenderEnum>;
export type SpeakerRole = z.infer<typeof SpeakerRoleEnum>;
export type SessionType = z.infer<typeof SessionTypeEnum>;
export type SessionLength = z.infer<typeof SessionLengthEnum>;
export type ParticipationType = z.infer<typeof ParticipationTypeEnum>;
export type ERVInvolvement = z.infer<typeof ERVInvolvementEnum>;
export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;
export type SpeakerApplication = z.infer<typeof speakerApplicationSchema>;
