/*
  Warnings:

  - Made the column `sceneId` on table `Choice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Choice" ALTER COLUMN "sceneId" SET NOT NULL;
