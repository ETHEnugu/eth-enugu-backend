/*
  Warnings:

  - Made the column `expectedArrivalDate` on table `SpeakerApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `SpeakerApplication` MODIFY `expectedArrivalDate` DATETIME(3) NOT NULL;
