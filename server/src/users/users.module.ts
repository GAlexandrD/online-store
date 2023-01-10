import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenService } from './token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  imports: [PrismaModule],
  exports: [TokenService],
})
export class UsersModule {}
