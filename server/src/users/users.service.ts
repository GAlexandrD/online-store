import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { UserData, UserResponse } from './entities/user-res.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: UserDto): Promise<UserResponse> {
    const isOccupiedName = await this.prisma.users.findFirst({
      where: { email: userDto.email },
    });
    if (isOccupiedName)
      throw new HttpException('try another mail', HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const newUser = await this.prisma.users.create({
      data: { email: userDto.email, password: hashPassword },
    });
    await this.prisma.baskets.create({ data: { userId: newUser.id } });
    const userData: UserData = {
      email: newUser.email,
      id: newUser.id,
      role: 'USER',
    };
    const token = this.tokenService.generateToken(userData);
    this.tokenService.saveToken(newUser.id, token.refreshToken);
    return { ...token, user: userData };
  }

  async login(userDto: UserDto): Promise<UserResponse> {
    const user = await this.prisma.users.findFirst({
      where: { email: userDto.email },
    });
    if (!user) throw new HttpException('wrong email', HttpStatus.BAD_REQUEST);
    const isCorrectPass = await bcrypt.compare(userDto.password, user.password);
    if (!isCorrectPass)
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    const userData: UserData = {
      email: user.email,
      id: user.id,
      role: user.role as any,
    };
    const token = this.tokenService.generateToken(userData);
    this.tokenService.saveToken(user.id, token.refreshToken);
    return { ...token, user: userData };
  }

  logout(refreshToken: string) {
    return this.tokenService.deleteToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<UserResponse> {
    if (!refreshToken)
      throw new HttpException('refresh failed', HttpStatus.UNAUTHORIZED);
    const userD: any = await this.tokenService.validateRefreshToken(
      refreshToken,
    );
    const findInDB = await this.tokenService.findToken(refreshToken);
    if (!userD || !findInDB)
      throw new HttpException('refresh failed', HttpStatus.UNAUTHORIZED);
    const user = await this.prisma.users.findFirst({ where: { id: userD.id } });
    const userData: UserData = {
      email: user.email,
      id: user.id,
      role: user.role as any,
    };
    const token = this.tokenService.generateToken(userData);
    this.tokenService.saveToken(user.id, token.refreshToken);
    return { ...token, user: userData };
  }
}
