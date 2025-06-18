/*
  Warnings:

  - You are about to drop the column `age` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to drop the column `attendanceType` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryAccessibilityNeeds` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to drop the column `expectedGains` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to drop the column `joinOnlineCommunity` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ConferenceSummit` table. All the data in the column will be lost.
  - You are about to alter the column `roleDescription` on the `ConferenceSummit` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `VarChar(191)`.
  - You are about to drop the `ConferenceDate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `willBeLive` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ConferenceDate` DROP FOREIGN KEY `ConferenceDate_summitId_fkey`;

-- AlterTable
ALTER TABLE `ConferenceSummit` DROP COLUMN `age`,
    DROP COLUMN `attendanceType`,
    DROP COLUMN `dietaryAccessibilityNeeds`,
    DROP COLUMN `expectedGains`,
    DROP COLUMN `joinOnlineCommunity`,
    DROP COLUMN `location`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `walletAddress` VARCHAR(191) NULL,
    ADD COLUMN `willBeLive` BOOLEAN NOT NULL,
    MODIFY `roleDescription` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ConferenceDate`;
