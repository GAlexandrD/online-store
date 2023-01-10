/*
  Warnings:

  - A unique constraint covering the columns `[basketId,deviceId]` on the table `basket_devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "basket_devices_basketId_deviceId_key" ON "basket_devices"("basketId", "deviceId");
