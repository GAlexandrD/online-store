import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiCreatedResponse({ type: Brand })
  create(@Body() { name }: CreateBrandDto) {
    return this.brandsService.create(name);
  }

  @Get()
  @ApiOkResponse({ type: Brand, isArray: true })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Brand })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Brand })
  update(@Param('id') id: string, @Body() { name }: CreateBrandDto) {
    return this.brandsService.update(+id, name);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Brand })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
