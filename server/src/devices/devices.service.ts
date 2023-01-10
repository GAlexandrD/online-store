import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceFilter } from './entities/devices-filter.entity';
import { Pagination } from './entities/pagination.entity';
import { v4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { DeviceEntity } from './entities/device.entity';
import { GetManyDevicesDto } from './dto/get-meny-devices.dto';

const responseSelect = {
  id: true,
  name: true,
  price: true,
  img: true,
  device_infos: true,
  brands: true,
  types: true,
};

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<DeviceEntity> {
    const { name, price, brand, type, device_infos } = createDeviceDto;
    const candidate = await this.prisma.devices.findFirst({ where: { name } });
    if (candidate)
      throw new HttpException('try other name', HttpStatus.BAD_REQUEST);
    const brandRecord = await this.prisma.brands.findFirst({
      where: { name: brand },
    });
    if (!brandRecord)
      throw new HttpException('no such brand', HttpStatus.BAD_REQUEST);
    const typeRecord = await this.prisma.types.findFirst({
      where: { name: type },
    });
    if (!typeRecord)
      throw new HttpException('no such type', HttpStatus.BAD_REQUEST);
    const device = await this.prisma.devices.create({
      data: {
        name,
        price,
        brandId: brandRecord.id,
        typeId: typeRecord.id,
        img: '',
        device_infos: { createMany: { data: device_infos } },
      },
      select: responseSelect,
    });
    return device;
  }

  async findMany(
    filter: DeviceFilter,
    pagination: Pagination,
  ): Promise<GetManyDevicesDto> {
    const skip = pagination.limit * (pagination.page - 1);
    const count = await this.prisma.devices.count();
    const devices = await this.prisma.devices.findMany({
      where: {
        ...filter,
        name: { startsWith: filter.name, mode: 'insensitive' },
      },
      skip,
      take: pagination.limit,
      select: responseSelect,
    });
    return { count, rows: devices };
  }

  async findOne(id: number): Promise<DeviceEntity> {
    const device = await this.prisma.devices.findFirst({
      where: { id },
      select: responseSelect,
    });
    if (!device)
      throw new HttpException('no such device', HttpStatus.BAD_REQUEST);
    return device;
  }

  async updateImg(id: number, img: Express.Multer.File): Promise<DeviceEntity> {
    const candidate = await this.prisma.devices.findFirst({ where: { id } });
    if (!candidate)
      throw new HttpException('no such device', HttpStatus.BAD_REQUEST);
    if (candidate.img) {
      await unlink(join(__dirname, '..', '..', 'public', candidate.img)).catch(
        (e) => console.log(e),
      );
    }
    const imgUrl = v4() + '.jpg';
    await writeFile(join(__dirname, '..', '..', 'public', imgUrl), img.buffer);
    const device = await this.prisma.devices.update({
      where: { id },
      data: { img: imgUrl },
      select: responseSelect,
    });
    return device;
  }

  async update(id: number, data: UpdateDeviceDto): Promise<DeviceEntity> {
    const candidate = await this.prisma.devices.findFirst({ where: { id } });
    if (!candidate)
      throw new HttpException('no such device', HttpStatus.BAD_REQUEST);
    const device = await this.prisma.devices.update({
      where: { id },
      data: data,
      select: responseSelect,
    });
    return device;
  }

  async remove(name: string): Promise<DeviceEntity> {
    const candidate = await this.prisma.devices.findFirst({ where: { name } });
    if (!candidate)
      throw new HttpException('no such device', HttpStatus.BAD_REQUEST);
    const device = await this.prisma.devices.delete({
      where: { name },
      select: responseSelect,
    });
    return device;
  }
}
