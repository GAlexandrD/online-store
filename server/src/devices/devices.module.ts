import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { createAuthMidleware } from 'src/midlewares/auth-midleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [PrismaModule, UsersModule],
})
export class DevicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAuthMidleware('ADMIN'))
      .exclude(
        { path: '/devices', method: RequestMethod.GET },
        { path: '/devices/:id', method: RequestMethod.GET },
      )
      .forRoutes(DevicesController);
  }
}
