import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetManyDevicesDto } from 'src/devices/dto/get-meny-devices.dto';
import { BasketsService } from './baskets.service';
import { BasketDeviceQueryDto } from './dto/basket-device.dto';
import { BasketParamsDto } from './dto/basket.dto';
import { BasketDeviceEntity } from './entities/basket-device.entity';

@Controller('basket')
@ApiTags('basket')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Post()
  @ApiCreatedResponse({ type: BasketDeviceEntity })
  create(@Body() basketDeviceEntity: BasketDeviceEntity) {
    return this.basketsService.addBasketDevice(basketDeviceEntity);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: GetManyDevicesDto })
  getAllDevices(@Query() basketDto: BasketParamsDto) {
    return this.basketsService.getBasketDevices(+basketDto.userId);
  }

  @Delete()
  @ApiOkResponse({ type: BasketDeviceEntity })
  remove(@Query() basketDeviceDto: BasketDeviceQueryDto) {
    return this.basketsService.deleteBasketDevice({
      userId: +basketDeviceDto.userId,
      deviceId: +basketDeviceDto.deviceId,
    });
  }
}
