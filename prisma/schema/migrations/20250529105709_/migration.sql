/*
  Warnings:

  - You are about to drop the `Attendee` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `certificateNeeded` on the `ConferenceSummit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StringBoolean" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "ConferenceSummit" DROP COLUMN "certificateNeeded",
ADD COLUMN     "certificateNeeded" "StringBoolean" NOT NULL;

-- DropTable
DROP TABLE "Attendee";
