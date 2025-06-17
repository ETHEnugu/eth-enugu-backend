/*
  Warnings:

  - You are about to drop the column `openToCollaboration` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `currentRole` on the `PopupCity` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `PopupCity` table. All the data in the column will be lost.
  - Added the required column `age` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `needCertificate` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canAttendIRL` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCetificateNeeded` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherRole` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participateInERV` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `PopupCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `PopupCity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Builder` DROP COLUMN `openToCollaboration`,
    ADD COLUMN `age` ENUM('AGE_16_19', 'AGE_20_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_PLUS') NOT NULL,
    ADD COLUMN `needCertificate` BOOLEAN NOT NULL,
    ADD COLUMN `walletAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PopupCity` DROP COLUMN `currentRole`,
    DROP COLUMN `location`,
    ADD COLUMN `canAttendIRL` BOOLEAN NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `isCetificateNeeded` BOOLEAN NOT NULL,
    ADD COLUMN `otherRole` VARCHAR(191) NOT NULL,
    ADD COLUMN `participateInERV` BOOLEAN NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `walletAddress` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PopCityDate` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `summitId` VARCHAR(191) NOT NULL,

    INDEX `PopCityDate_summitId_idx`(`summitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PopCityDate` ADD CONSTRAINT `PopCityDate_summitId_fkey` FOREIGN KEY (`summitId`) REFERENCES `PopupCity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
