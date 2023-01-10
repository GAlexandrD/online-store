import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeviceEntity } from './entities/device.entity';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Express } from 'express';
import { GetDevicesParams } from './dto/get-devices-params.dto';
import { Pagination } from './entities/pagination.entity';
import { DeviceFilter } from './entities/devices-filter.entity';
import { GetManyDevicesDto } from './dto/get-meny-devices.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('devices')
@ApiTags('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiCreatedResponse({ type: DeviceEntity })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Post('upload-img/:id')
  @UseInterceptors(FileInterceptor('img'))
  upload(@Param('id') id, @UploadedFile() img: Express.Multer.File) {
    return this.devicesService.updateImg(+id, img);
  }

  @Get()
  @ApiOkResponse({ type: GetManyDevicesDto })
  findMany(@Query() query: GetDevicesParams) {
    if (!query.limit || !query.page)
      throw new HttpException(
        'request miss page and limit params',
        HttpStatus.BAD_REQUEST,
      );
    const pagination: Pagination = { limit: +query.limit, page: +query.page };
    const filter: DeviceFilter = {};
    if (query.brandId) filter.brandId = +query.brandId;
    if (query.typeId) filter.typeId = +query.typeId;
    filter.name = query.name || '';
    return this.devicesService.findMany(filter, pagination);
  }

  @Get(':id')
  @ApiOkResponse({ type: DeviceEntity })
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DeviceEntity })
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.devicesService.remove(name);
  }
}
