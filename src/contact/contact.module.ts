/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ContactController],
  providers:[userService,commonService]
 
})
export class ContactModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ContactController);
  }
}
