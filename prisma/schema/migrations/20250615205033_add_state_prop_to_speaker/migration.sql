/*
  Warnings:

  - Added the required column `state` to the `SpeakerApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SpeakerApplication` ADD COLUMN `state` VARCHAR(191) NOT NULL;
