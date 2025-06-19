/*
  Warnings:

  - Added the required column `otherRole` to the `ConferenceSummit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ConferenceSummit` ADD COLUMN `otherRole` VARCHAR(191) NOT NULL;
