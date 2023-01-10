-- DropForeignKey
ALTER TABLE "basket_devices" DROP CONSTRAINT "basket_devices_basketId_fkey";

-- DropForeignKey
ALTER TABLE "basket_devices" DROP CONSTRAINT "basket_devices_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "baskets" DROP CONSTRAINT "baskets_userId_fkey";

-- DropForeignKey
ALTER TABLE "device_infos" DROP CONSTRAINT "device_infos_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "baskets" ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basket_devices" ADD CONSTRAINT "basket_devices_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basket_devices" ADD CONSTRAINT "basket_devices_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_infos" ADD CONSTRAINT "device_infos_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
