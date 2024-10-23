/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('support')
export class SupportController {
  constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}
  @Post()
  async create(@Body() body: any) {
    try {
      return await this.client.send('create_support', body).toPromise();
    } catch (error) {
      console.error('Error during create operation:', error);
      throw new Error('Failed to create support entry');
    }
  }
  
  @Get()
  async findAll() {
    try {
      return await this.client.send('find_all_support', {}).toPromise();
    } catch (error) {
      console.error('Error during findAll operation:', error);
      throw new Error('Failed to retrieve support entries');
    }
  }
  
}
