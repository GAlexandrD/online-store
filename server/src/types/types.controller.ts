import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Type } from './entities/type.entity';

@Controller('types')
@ApiTags('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @ApiCreatedResponse({ type: Type })
  create(@Body() { name }: CreateTypeDto) {
    return this.typesService.create(name);
  }

  @Get()
  @ApiOkResponse({ type: Type, isArray: true })
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Type })
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Type })
  update(@Param('id') id: string, @Body() { name }: CreateTypeDto) {
    return this.typesService.update(+id, name);
  }

  @Delete(':name')
  @ApiOkResponse({ type: Type })
  remove(@Param('name') name: string) {
    return this.typesService.remove(name);
  }
}
