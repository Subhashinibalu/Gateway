import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy} from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('about')
export class AboutController {
  constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() body: any) {
    return this.client.send({ cmd: 'create_about' }, body); // Send create command to microservice
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'find_all_about' }, {}); // Send find command to microservice
  }
}
