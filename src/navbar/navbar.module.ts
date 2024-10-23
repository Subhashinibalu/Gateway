// src/navbar/navbar.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NavbarController } from './navbar.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [NavbarController],
  providers:[userService,commonService]
})
export class NavbarModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(NavbarController);
  }
}
