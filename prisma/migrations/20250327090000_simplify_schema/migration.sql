-- Drop existing foreign key constraints
ALTER TABLE "Resume" DROP CONSTRAINT IF EXISTS "Resume_userId_fkey";
ALTER TABLE "Subscription" DROP CONSTRAINT IF EXISTS "Subscription_userId_fkey";

-- Drop User table
DROP TABLE IF EXISTS "User";

-- Modify Resume table
ALTER TABLE "Resume" DROP CONSTRAINT IF EXISTS "Resume_userId_key";
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- Add index to Subscription table
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId"); 