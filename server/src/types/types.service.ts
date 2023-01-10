import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { types } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<types> {
    const candidate = await this.prisma.types.findFirst({ where: { name } });
    if (candidate)
      throw new HttpException(
        `type ${name} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    const type = await this.prisma.types.create({ data: { name } });
    return type;
  }

  async findAll(): Promise<types[]> {
    return await this.prisma.types.findMany();
  }

  async findOne(id: number): Promise<types> {
    const type = await this.prisma.types.findFirst({ where: { id } });
    if (!type) throw new HttpException('no such type', HttpStatus.BAD_REQUEST);
    return type;
  }

  async update(id: number, name: string): Promise<types> {
    const type = await this.prisma.types.update({
      where: { id },
      data: { name },
    });
    if (!type) throw new HttpException('no such type', HttpStatus.BAD_REQUEST);
    return type;
  }

  async remove(id: number): Promise<types> {
    const type = await this.prisma.types.delete({ where: { id } });
    if (!type) throw new HttpException('no such type', HttpStatus.BAD_REQUEST);
    return type;
  }
}
