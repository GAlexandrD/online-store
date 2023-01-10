import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { createAuthMidleware } from 'src/midlewares/auth-midleware';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [PrismaModule, UsersModule],
})
export class TypesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAuthMidleware('ADMIN'))
      .forRoutes(
        { path: '/brands/:id', method: RequestMethod.DELETE },
        { path: '/brands/:id', method: RequestMethod.PATCH },
      );
  }
}
