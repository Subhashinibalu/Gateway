// src/about/about.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AboutController } from './about.controller'; // Adjust the import path as necessary
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AboutController],
  providers:[userService,commonService]
})
export class AboutModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(AboutController);
    }
  }
