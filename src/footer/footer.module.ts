// src/footer/footer.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FooterController } from './footer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [FooterController],
    providers:[userService,commonService]
})
export class FooterModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(FooterController);
  }
}
