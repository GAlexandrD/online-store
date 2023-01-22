import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { UserData } from './entities/user-res.entity';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}
  generateToken(payload: any): IToken {
    const accessToken = jwt.sign(payload, process.env.TOKEN_ACCESS_SECRET_KEY, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.TOKEN_REFRESH_SECRET_KEY,
      { expiresIn: '30d' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refresh: string) {
    const token = await this.prisma.tokens.findFirst({ where: { userId } });
    if (token) {
      return await this.prisma.tokens.update({
        where: { userId },
        data: { refresh },
      });
    }
    const newToken = await this.prisma.tokens.create({
      data: { userId, refresh },
    });
    return newToken;
  }

  async deleteToken(refreshToken: string) {
    const token = await this.prisma.tokens.delete({
      where: { refresh: refreshToken },
    });
    return token;
  }

  async validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.TOKEN_REFRESH_SECRET_KEY,
      );
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(
        accessToken,
        process.env.TOKEN_ACCESS_SECRET_KEY,
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const token = await this.prisma.tokens.findFirst({
      where: { refresh: refreshToken },
    });
    return token;
  }
}
