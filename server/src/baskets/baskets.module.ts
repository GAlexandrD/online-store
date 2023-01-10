import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { createAuthMidleware } from 'src/midlewares/auth-midleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BasketsController],
  providers: [BasketsService],
  imports: [PrismaModule, UsersModule],
})
export class BasketsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(createAuthMidleware('USER')).forRoutes(BasketsController);
  }
}
