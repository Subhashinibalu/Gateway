// src/upload/upload.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { commonService, userService } from 'src/helper/client';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true })      
    ],
    controllers: [UploadController],
    providers:[userService,commonService]
})
export class UploadModule {}
