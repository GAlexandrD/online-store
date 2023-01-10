import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Response, Request } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserData, UserResponse } from './entities/user-res.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  @ApiCreatedResponse({ type: UserResponse })
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: UserDto,
  ) {
    const token: any = await this.usersService.registration(userDto);
    if (!token.refreshToken) return token;
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return token;
  }

  @Post('login')
  @ApiOkResponse({ type: UserResponse })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: UserDto,
  ) {
    const token: any = await this.usersService.login(userDto);
    if (!token.refreshToken) return token;
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie('smth', token.refreshToken, {});
    return token;
  }

  @Post('logout')
  @ApiOkResponse({ type: UserData })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return '';
    const result = await this.usersService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return result;
  }

  @Get('refresh')
  @ApiOkResponse({ type: UserResponse })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const token: any = await this.usersService.refresh(refreshToken);
    res.clearCookie('refreshToken');
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return token;
  }
}
