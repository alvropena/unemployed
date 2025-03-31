/*
  Warnings:

  - You are about to drop the column `location` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "location",
DROP COLUMN "website";
