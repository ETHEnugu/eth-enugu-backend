-- CreateTable
CREATE TABLE `Builder` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `age` ENUM('AGE_16_19', 'AGE_20_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_PLUS') NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `walletAddress` VARCHAR(191) NOT NULL,
    `githubProfile` VARCHAR(191) NULL,
    `social` VARCHAR(191) NOT NULL,
    `portfolioUrl` VARCHAR(191) NULL,
    `primaryRole` VARCHAR(191) NOT NULL,
    `otherPrimaryRole` VARCHAR(191) NULL,
    `backgroundAndSkills` TEXT NOT NULL,
    `currentlyBuilding` TEXT NOT NULL,
    `previousBuilderPrograms` VARCHAR(191) NOT NULL,
    `hasRegisteredForTheHackathon` BOOLEAN NOT NULL,
    `joinReason` TEXT NOT NULL,
    `comfortableSharingAccomodation` BOOLEAN NOT NULL,
    `dietaryAccessibilityNeeds` TEXT NULL,
    `willBeLive` BOOLEAN NOT NULL,
    `needCertificate` BOOLEAN NOT NULL,
    `referralSource` TEXT NOT NULL,
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
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `social` VARCHAR(191) NOT NULL,
    `walletAddress` VARCHAR(191) NULL,
    `roleDescription` VARCHAR(191) NOT NULL,
    `otherRole` VARCHAR(191) NULL,
    `certificateNeeded` ENUM('YES', 'NO') NOT NULL,
    `openToVolunteer` BOOLEAN NOT NULL,
    `willBeLive` BOOLEAN NOT NULL,
    `referralSource` TEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `ConferenceSummit_email_key`(`email`),
    INDEX `ConferenceSummit_email_idx`(`email`),
    INDEX `ConferenceSummit_status_idx`(`status`),
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
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `walletAddress` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `otherRole` VARCHAR(191) NULL,
    `web3Familiarity` ENUM('NEW', 'DABBLED', 'ACTIVELY_BUILDING') NOT NULL,
    `attendDay1` VARCHAR(191) NULL,
    `attendDay2` VARCHAR(191) NULL,
    `freeLunchConsideration` TEXT NULL,
    `volunteeringInterest` ENUM('YES', 'NO', 'MAYBE') NOT NULL,
    `canAttendIRL` BOOLEAN NOT NULL,
    `participateInERV` BOOLEAN NOT NULL,
    `isCertificateNeeded` BOOLEAN NOT NULL,
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
CREATE TABLE `PopCityDate` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `summitId` VARCHAR(191) NOT NULL,

    INDEX `PopCityDate_summitId_idx`(`summitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpeakerApplication` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY') NOT NULL,
    `whatsappNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `bio` TEXT NOT NULL,
    `twitterProfile` VARCHAR(191) NULL,
    `linkedinProfile` VARCHAR(191) NULL,
    `otherRole` VARCHAR(191) NULL,
    `social` VARCHAR(191) NOT NULL,
    `portfolioUrl` VARCHAR(191) NOT NULL,
    `participationType` ENUM('MENTOR_ONLY', 'SPEAK_ONLY', 'BOTH') NOT NULL,
    `sessionType` ENUM('TALK', 'PANEL', 'WORKSHOP', 'FIRESIDE_CHAT', 'OTHER') NOT NULL,
    `otherSessionType` VARCHAR(191) NULL,
    `sessionLength` ENUM('MINUTES_5', 'MINUTES_10', 'MINUTES_15', 'MINUTES_30', 'MINUTES_45', 'MINUTES_60') NOT NULL,
    `presentationAvailable` BOOLEAN NOT NULL,
    `presentationLink` VARCHAR(191) NULL,
    `setupRequirements` TEXT NULL,
    `talkTitle` VARCHAR(191) NULL,
    `talkDescription` TEXT NULL,
    `comfortableWithTopicChange` BOOLEAN NOT NULL,
    `canMakeItToEnugu` BOOLEAN NOT NULL,
    `participateInERV` BOOLEAN NOT NULL,
    `ervInvolvement` ENUM('LEARN_DURING_ERV', 'MENTOR_DURING_ERV') NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `SpeakerApplication_email_key`(`email`),
    INDEX `SpeakerApplication_email_idx`(`email`),
    INDEX `SpeakerApplication_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpeakerRole` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('BLOCKCHAIN_DEVELOPER_ENGINEER', 'CORE_PROTOCOL_ENGINEER', 'FRONTEND_BACKEND_FULLSTACK_DEVELOPER', 'TECHNICAL_WRITER', 'RESEARCHERS', 'NODE_RUNNERS_AND_OPERATORS', 'WEB3_SECURITY_AND_AUDITORS', 'GENERAL_BLOCKCHAIN_CRYPTO_ENTHUSIAST', 'CONTENT_CREATORS_AND_CONTENT_WRITERS', 'UI_UX_AND_CREATIVE_DESIGNERS', 'COMMUNITY_SOCIAL_MEDIA_MANAGER', 'WEB3_COMMUNITY_LEADER', 'CRYPTO_TRADERS_DEGENS', 'OTHER') NOT NULL,
    `applicationId` VARCHAR(191) NOT NULL,

    INDEX `SpeakerRole_applicationId_idx`(`applicationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpeakerArrivalDate` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `applicationId` VARCHAR(191) NOT NULL,

    INDEX `SpeakerArrivalDate_applicationId_idx`(`applicationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PopCityDate` ADD CONSTRAINT `PopCityDate_summitId_fkey` FOREIGN KEY (`summitId`) REFERENCES `PopupCity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpeakerRole` ADD CONSTRAINT `SpeakerRole_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `SpeakerApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpeakerArrivalDate` ADD CONSTRAINT `SpeakerArrivalDate_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `SpeakerApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
