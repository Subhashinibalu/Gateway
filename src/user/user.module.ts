import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { userService } from 'src/helper/client';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
  providers:[userService,]
})
export class UserModule {}
