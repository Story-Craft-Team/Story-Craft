-- AlterTable
ALTER TABLE "User" ALTER COLUMN "planWillDeleteAt" DROP NOT NULL,
ALTER COLUMN "planWillDeleteAt" DROP DEFAULT;
