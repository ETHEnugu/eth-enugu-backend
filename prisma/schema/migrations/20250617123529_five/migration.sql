/*
  Warnings:

  - You are about to drop the column `linkedinProfile` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `twitterProfile` on the `Builder` table. All the data in the column will be lost.
  - You are about to alter the column `previousBuilderPrograms` on the `Builder` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(18))` to `VarChar(191)`.
  - Added the required column `social` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openToVolunteer` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Builder` DROP COLUMN `linkedinProfile`,
    DROP COLUMN `twitterProfile`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `social` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    MODIFY `previousBuilderPrograms` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ConferenceSummit` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `openToVolunteer` BOOLEAN NOT NULL,
    ADD COLUMN `social` VARCHAR(191) NOT NULL;
