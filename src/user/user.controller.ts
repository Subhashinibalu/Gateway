// src/user/user.gateway.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() userData: any) {
    return this.client.send({ cmd: 'register' }, userData);
  }

  @Post('login')
  async loginUser(@Body() userData: any) {
    return this.client.send({ cmd: 'login' }, userData);
  }
  @Get('findUser')
  async getUser(@Body() id:any) {
    return this.client.send({ cmd: 'findUser' }, id);
  }
}


