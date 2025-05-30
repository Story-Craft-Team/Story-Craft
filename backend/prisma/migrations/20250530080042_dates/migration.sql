-- AlterTable
ALTER TABLE "User" ALTER COLUMN "planWillDeleteAt" SET DEFAULT NOW() + interval '1 month';
