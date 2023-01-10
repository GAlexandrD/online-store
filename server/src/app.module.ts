import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';
import { TypesModule } from './types/types.module';
import { BasketsModule } from './baskets/baskets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TokenService } from './users/token.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PrismaModule,
    UsersModule,
    DevicesModule,
    BrandsModule,
    TypesModule,
    BasketsModule,
  ],
  providers: [TokenService],
})
export class AppModule {}
