import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { brands } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<brands> {
    const candidate = await this.prisma.brands.findFirst({ where: { name } });
    if (candidate)
      throw new HttpException(
        `brand ${name} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    const brand = await this.prisma.brands.create({ data: { name } });
    return brand;
  }

  async findAll(): Promise<brands[]> {
    return await this.prisma.brands.findMany();
  }

  async findOne(id: number): Promise<brands> {
    const brand = await this.prisma.brands.findFirst({ where: { id } });
    if (!brand)
      throw new HttpException('no such brand', HttpStatus.BAD_REQUEST);
    return brand;
  }

  async update(id: number, name: string): Promise<brands> {
    const brand = await this.prisma.brands.update({
      where: { id },
      data: { name },
    });
    if (!brand)
      throw new HttpException('no such brand', HttpStatus.BAD_REQUEST);
    return brand;
  }

  async remove(name: string): Promise<brands> {
    const candidate = await this.prisma.brands.findFirst({ where: { name } });
    if (!candidate)
      throw new HttpException('no such brand', HttpStatus.BAD_REQUEST);
    const brand = await this.prisma.brands.delete({ where: { name } });
    return brand;
  }
}
