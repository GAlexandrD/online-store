import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { basket_devices } from '@prisma/client';
import { GetManyDevicesDto } from 'src/devices/dto/get-meny-devices.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasketDeviceEntity } from './entities/basket-device.entity';

@Injectable()
export class BasketsService {
  constructor(private prisma: PrismaService) {}

  async getBasketDevices(userId: number): Promise<GetManyDevicesDto> {
    const basket = await this.prisma.baskets.findFirst({
      where: { userId },
    });
    if (!basket)
      throw new HttpException('no such basket', HttpStatus.BAD_REQUEST);
    const basketDevices = await this.prisma.basket_devices.findMany({
      where: { basketId: basket.id },
      select: {
        id: true,
        devices: {
          select: {
            id: true,
            name: true,
            price: true,
            img: true,
            device_infos: true,
            brands: true,
            types: true,
          },
        },
      },
    });
    const devicesResponse = basketDevices.map((device) => device.devices);
    const count = await this.prisma.basket_devices.count({
      where: { basketId: basket.id },
    });
    if (!basket || !basketDevices)
      throw new HttpException('wrong basket', HttpStatus.BAD_REQUEST);
    return { count, rows: devicesResponse };
  }

  async addBasketDevice(
    basketDeviceDto: BasketDeviceEntity,
  ): Promise<basket_devices> {
    const basket = await this.prisma.baskets.findFirst({
      where: { userId: basketDeviceDto.userId },
    });
    if (!basket)
      throw new HttpException('no such basket', HttpStatus.BAD_REQUEST);
    const device = await this.prisma.devices.findFirst({
      where: { id: basketDeviceDto.deviceId },
    });
    if (!device)
      throw new HttpException('no such device', HttpStatus.BAD_REQUEST);
    const basketDevice = await this.prisma.basket_devices.findFirst({
      where: { basketId: basket.id, deviceId: device.id },
    });
    if (basketDevice)
      throw new HttpException(
        'device already in basket',
        HttpStatus.BAD_REQUEST,
      );
    const newBasketDevice = await this.prisma.basket_devices.create({
      data: { basketId: basket.id, deviceId: device.id },
    });
    return newBasketDevice;
  }

  async deleteBasketDevice(
    basketDeviceDto: BasketDeviceEntity,
  ): Promise<basket_devices> {
    const basket = await this.prisma.baskets.findFirst({
      where: { userId: basketDeviceDto.userId },
    });
    if (!basket)
      throw new HttpException('no such basket', HttpStatus.BAD_REQUEST);
    const basketDevice = await this.prisma.basket_devices.delete({
      where: {
        basketId_deviceId: {
          deviceId: basketDeviceDto.deviceId,
          basketId: basket.id,
        },
      },
    });
    return basketDevice;
  }
}
