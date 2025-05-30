-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'level_1', 'level_2');

-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_storyId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'free',
ADD COLUMN     "planCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "planWillDeleteAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
