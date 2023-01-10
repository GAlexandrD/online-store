/*
  Warnings:

  - You are about to drop the column `rating` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_userId_fkey";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "rating";

-- DropTable
DROP TABLE "ratings";
