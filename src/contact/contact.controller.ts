/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

  @Post()
  async upsert(@Body() body: any) {
    return this.client.send({ cmd: 'upsert_contact' }, body); // Send upsert command to microservice
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'find_all_contacts' }, {}); // Send find command to microservice
  }
}
