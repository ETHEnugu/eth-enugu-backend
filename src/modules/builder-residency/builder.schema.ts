import { z } from "zod";

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

// Single comprehensive schema for the entire form
export const builderResidencySchema = z
  .object({
    // Personal Information (Page 1)
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email address"),
    gender: GenderEnum,
    whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
    location: z.string().min(3, "Location is required"),
    githubProfile: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
    twitterProfile: z.string().min(1, "Twitter/X profile is required"),
    linkedinProfile: z.string().min(1, "LinkedIn profile is required"),
    portfolioUrl: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),

    // Background Information (Page 2)
    primaryRole: PrimaryRoleEnum,
    otherPrimaryRole: z.string().optional(),
    backgroundAndSkills: z
      .string()
      .min(10, "Please share more about your background"),
    currentlyBuilding: z
      .string()
      .min(3, "Please answer if you are currently building something"),
    previousBuilderPrograms: z.boolean(),

    // Residency Information (Page 3)
    joinReason: z.string().min(10, "Please explain why you want to join"),
    projectInterest: z
      .string()
      .min(3, "Please select what you want to work on"),
    openToCollaboration: z.boolean(),
    needsAccommodation: z.boolean(),
    dietaryAccessibilityNeeds: z.string().optional(),
    referralSource: z
      .string()
      .min(3, "Please let us know how you heard about us"),
    joinOnlineCommunity: z.boolean(),
  })
  .refine(
    (data) => {
      // If primaryRole is "OTHER", then otherPrimaryRole is required
      if (data.primaryRole === "OTHER") {
        return (
          data.otherPrimaryRole && data.otherPrimaryRole.trim().length >= 3
        );
      }
      return true;
    },
    {
      message: "Please specify your primary role when selecting 'OTHER'",
      path: ["otherPrimaryRole"],
    }
  );

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
