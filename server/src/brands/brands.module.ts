import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { createAuthMidleware } from 'src/midlewares/auth-midleware';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [PrismaModule, UsersModule],
})
export class BrandsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAuthMidleware('ADMIN'))
      .forRoutes(
        { path: '/brands/:id', method: RequestMethod.DELETE },
        { path: '/brands/:id', method: RequestMethod.PATCH },
      );
  }
}
