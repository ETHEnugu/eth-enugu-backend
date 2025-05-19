-- CreateEnum
CREATE TYPE "PrimaryRole" AS ENUM ('DEVELOPER', 'DESIGNER', 'FOUNDER', 'RESEARCHER', 'OTHER');

-- CreateEnum
CREATE TYPE "AgeRange" AS ENUM ('AGE_16_19', 'AGE_20_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_PLUS');

-- CreateEnum
CREATE TYPE "RoleDescription" AS ENUM ('STUDENT', 'DEVELOPER', 'DESIGNER', 'ENTREPRENEUR', 'WEB3_ENTHUSIAST', 'OTHER');

-- CreateEnum
CREATE TYPE "AttendanceType" AS ENUM ('ATTENDEE', 'VOLUNTEER', 'SPEAKER', 'EXHIBITOR');

-- CreateEnum
CREATE TYPE "CurrentRole" AS ENUM ('STUDENT', 'DEVELOPER', 'DESIGNER', 'ENTREPRENEUR', 'WEB3_ENTHUSIAST', 'OTHER');

-- CreateEnum
CREATE TYPE "Web3Familiarity" AS ENUM ('NEW', 'DABBLED', 'ACTIVELY_BUILDING');

-- CreateEnum
CREATE TYPE "VolunteerOption" AS ENUM ('YES', 'NO', 'MAYBE');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JoinCommunityOption" AS ENUM ('YES', 'NO', 'ALREADY_MEMBER');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('TALK', 'PANEL', 'WORKSHOP', 'FIRESIDE_CHAT', 'OTHER');

-- CreateEnum
CREATE TYPE "SessionLength" AS ENUM ('MINUTES_15', 'MINUTES_30', 'MINUTES_45', 'MINUTES_60');

-- CreateTable
CREATE TABLE "Builder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "githubProfile" TEXT,
    "twitterProfile" TEXT NOT NULL,
    "linkedinProfile" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "primaryRole" "PrimaryRole" NOT NULL,
    "backgroundAndSkills" TEXT NOT NULL,
    "currentlyBuilding" TEXT NOT NULL,
    "previousBuilderPrograms" BOOLEAN NOT NULL,
    "joinReason" TEXT NOT NULL,
    "projectInterest" TEXT NOT NULL,
    "openToCollaboration" BOOLEAN NOT NULL,
    "needsAccommodation" BOOLEAN NOT NULL,
    "dietaryAccessibilityNeeds" TEXT,
    "referralSource" TEXT NOT NULL,
    "joinOnlineCommunity" BOOLEAN NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Builder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConferenceSummit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "age" "AgeRange" NOT NULL,
    "gender" "Gender" NOT NULL,
    "roleDescription" "RoleDescription" NOT NULL,
    "expectedGains" TEXT,
    "attendanceType" "AttendanceType" NOT NULL,
    "certificateNeeded" BOOLEAN NOT NULL,
    "dietaryAccessibilityNeeds" TEXT,
    "referralSource" TEXT NOT NULL,
    "joinOnlineCommunity" "JoinCommunityOption" NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ConferenceSummit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopupCity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "currentRole" "CurrentRole" NOT NULL,
    "web3Familiarity" "Web3Familiarity" NOT NULL,
    "attendDay1" TEXT,
    "attendDay2" TEXT,
    "freeLunchConsideration" TEXT,
    "volunteeringInterest" "VolunteerOption" NOT NULL,
    "dietaryAccessibilityNeeds" TEXT,
    "referralSource" TEXT NOT NULL,
    "joinOnlineCommunity" "JoinCommunityOption" NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PopupCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakerApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "twitterProfile" TEXT,
    "linkedinProfile" TEXT NOT NULL,
    "website" TEXT,
    "sessionType" "SessionType" NOT NULL,
    "sessionLength" "SessionLength" NOT NULL,
    "presentationAvailable" BOOLEAN NOT NULL,
    "presentationLink" TEXT,
    "setupRequirements" TEXT,
    "talkTitle" TEXT,
    "talkDescription" TEXT,
    "expectedArrivalDate" TEXT,
    "willingToSpeakWithoutSupport" BOOLEAN NOT NULL,
    "referralSource" TEXT NOT NULL,
    "joinOnlineCommunity" "JoinCommunityOption" NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "SpeakerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Builder_email_key" ON "Builder"("email");

-- CreateIndex
CREATE INDEX "Builder_email_idx" ON "Builder"("email");

-- CreateIndex
CREATE INDEX "Builder_status_idx" ON "Builder"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceSummit_email_key" ON "ConferenceSummit"("email");

-- CreateIndex
CREATE INDEX "ConferenceSummit_email_idx" ON "ConferenceSummit"("email");

-- CreateIndex
CREATE INDEX "ConferenceSummit_status_idx" ON "ConferenceSummit"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PopupCity_email_key" ON "PopupCity"("email");

-- CreateIndex
CREATE INDEX "PopupCity_email_idx" ON "PopupCity"("email");

-- CreateIndex
CREATE INDEX "PopupCity_status_idx" ON "PopupCity"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_phoneNumber_key" ON "Attendee"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SpeakerApplication_email_key" ON "SpeakerApplication"("email");

-- CreateIndex
CREATE INDEX "SpeakerApplication_email_idx" ON "SpeakerApplication"("email");

-- CreateIndex
CREATE INDEX "SpeakerApplication_status_idx" ON "SpeakerApplication"("status");
