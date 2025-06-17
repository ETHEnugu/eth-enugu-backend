/*
  Warnings:

  - You are about to drop the column `isCetificateNeeded` on the `PopupCity` table. All the data in the column will be lost.
  - Added the required column `isCertificateNeeded` to the `PopupCity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PopupCity` DROP COLUMN `isCetificateNeeded`,
    ADD COLUMN `isCertificateNeeded` BOOLEAN NOT NULL;
