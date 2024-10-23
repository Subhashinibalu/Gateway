import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('home')
export class HomeController {
  constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.client.send('create_home', body).toPromise(); // Send as string
    } catch (error) {
      console.error('Error creating home:', error);
      throw new Error('Failed to create home');
    }
  }
  
  

 
  @Get()
  async findAll() {
    try {
      return await this.client.send('find_all_homes', {}).toPromise(); // Send as string
    } catch (error) {
      console.error('Error fetching homes:', error);
      throw new Error('Failed to fetch homes');
    }
  }

}
