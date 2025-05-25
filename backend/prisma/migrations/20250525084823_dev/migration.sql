/*
  Warnings:

  - You are about to drop the column `nextScene` on the `Choice` table. All the data in the column will be lost.
  - Added the required column `nextSceneId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_storyId_fkey";

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "nextScene",
ADD COLUMN     "nextSceneId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "language" SET DEFAULT 'ru';
