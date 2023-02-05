import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { defaultMaxListeners } from 'stream';
import { UserLogIn, UserSignUp } from './users.dto';
import { UserService } from './users.services';

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post('signup')
  async signUp(@Body() user_details: UserSignUp) {
    const result = await this.service.SignUp(user_details);
    return result;
  }
  @Get('login')
  async Login(@Body() user_details: UserLogIn){
    const result = await this.service.Login(user_details);
    return result;
  };
}
