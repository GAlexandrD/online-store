/*
  Warnings:

  - Made the column `typeId` on table `devices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brandId` on table `devices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_brandId_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_typeId_fkey";

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "typeId" SET NOT NULL,
ALTER COLUMN "brandId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
