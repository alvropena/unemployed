/*
  Warnings:

  - You are about to drop the column `gpa` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `proficiency` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "gpa";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "technologies";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "github",
DROP COLUMN "link",
DROP COLUMN "technologies";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "proficiency";
