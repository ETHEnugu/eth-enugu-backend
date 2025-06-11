-- CreateTable
CREATE TABLE `Builder` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `githubProfile` VARCHAR(191) NULL,
    `twitterProfile` VARCHAR(191) NOT NULL,
    `linkedinProfile` VARCHAR(191) NOT NULL,
    `portfolioUrl` VARCHAR(191) NULL,
    `primaryRole` ENUM('DEVELOPER', 'DESIGNER', 'FOUNDER', 'RESEARCHER', 'OTHER') NOT NULL,
    `backgroundAndSkills` TEXT NOT NULL,
    `currentlyBuilding` TEXT NOT NULL,
    `previousBuilderPrograms` BOOLEAN NOT NULL,
    `joinReason` TEXT NOT NULL,
    `projectInterest` VARCHAR(191) NOT NULL,
    `openToCollaboration` BOOLEAN NOT NULL,
    `needsAccommodation` BOOLEAN NOT NULL,
    `dietaryAccessibilityNeeds` TEXT NULL,
    `referralSource` TEXT NOT NULL,
    `joinOnlineCommunity` BOOLEAN NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `Builder_email_key`(`email`),
    INDEX `Builder_email_idx`(`email`),
    INDEX `Builder_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConferenceSummit` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `age` ENUM('AGE_16_19', 'AGE_20_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_PLUS') NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `roleDescription` ENUM('STUDENT', 'DEVELOPER', 'DESIGNER', 'ENTREPRENEUR', 'WEB3_ENTHUSIAST', 'OTHER') NOT NULL,
    `expectedGains` TEXT NULL,
    `attendanceType` ENUM('ATTENDEE', 'VOLUNTEER', 'SPEAKER', 'EXHIBITOR') NOT NULL,
    `certificateNeeded` ENUM('YES', 'NO') NOT NULL,
    `dietaryAccessibilityNeeds` TEXT NULL,
    `referralSource` TEXT NOT NULL,
    `joinOnlineCommunity` ENUM('YES', 'NO', 'ALREADY_MEMBER') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `ConferenceSummit_email_key`(`email`),
    INDEX `ConferenceSummit_email_idx`(`email`),
    INDEX `ConferenceSummit_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConferenceDate` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `summitId` VARCHAR(191) NOT NULL,

    INDEX `ConferenceDate_summitId_idx`(`summitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PopupCity` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `currentRole` ENUM('STUDENT', 'DEVELOPER', 'DESIGNER', 'ENTREPRENEUR', 'WEB3_ENTHUSIAST', 'OTHER') NOT NULL,
    `web3Familiarity` ENUM('NEW', 'DABBLED', 'ACTIVELY_BUILDING') NOT NULL,
    `attendDay1` VARCHAR(191) NULL,
    `attendDay2` VARCHAR(191) NULL,
    `freeLunchConsideration` TEXT NULL,
    `volunteeringInterest` ENUM('YES', 'NO', 'MAYBE') NOT NULL,
    `dietaryAccessibilityNeeds` TEXT NULL,
    `referralSource` TEXT NOT NULL,
    `joinOnlineCommunity` ENUM('YES', 'NO', 'ALREADY_MEMBER') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `PopupCity_email_key`(`email`),
    INDEX `PopupCity_email_idx`(`email`),
    INDEX `PopupCity_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpeakerApplication` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `twitterProfile` VARCHAR(191) NULL,
    `linkedinProfile` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `sessionType` ENUM('TALK', 'PANEL', 'WORKSHOP', 'FIRESIDE_CHAT', 'OTHER') NOT NULL,
    `sessionLength` ENUM('MINUTES_15', 'MINUTES_30', 'MINUTES_45', 'MINUTES_60') NOT NULL,
    `presentationAvailable` BOOLEAN NOT NULL,
    `presentationLink` VARCHAR(191) NULL,
    `setupRequirements` TEXT NULL,
    `talkTitle` VARCHAR(191) NULL,
    `talkDescription` TEXT NULL,
    `expectedArrivalDate` VARCHAR(191) NULL,
    `willingToSpeakWithoutSupport` BOOLEAN NOT NULL,
    `referralSource` TEXT NOT NULL,
    `joinOnlineCommunity` ENUM('YES', 'NO', 'ALREADY_MEMBER') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `SpeakerApplication_email_key`(`email`),
    INDEX `SpeakerApplication_email_idx`(`email`),
    INDEX `SpeakerApplication_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConferenceDate` ADD CONSTRAINT `ConferenceDate_summitId_fkey` FOREIGN KEY (`summitId`) REFERENCES `ConferenceSummit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
