// src/home/home.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HomeController } from './home.controller'; // Adjust the import path as necessary
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HomeController],
  providers:[userService,commonService]
})
export class HomeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(HomeController);
  }
}