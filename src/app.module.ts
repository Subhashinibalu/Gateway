import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { SupportModule } from './support/support.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module'; // Import the UserModule
import { UploadModule } from './upload/upload.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { AboutModule } from './about/about.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [     ServeStaticModule.forRoot(
    {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/public/',
    },
),
    ConfigModule.forRoot({ isGlobal: true }),
    HomeModule,
    SupportModule,
    ContactModule,
    UserModule,
    UploadModule,
    NavbarModule,
    FooterModule,
    AboutModule,
    ClientsModule.register([
      {
        name: 'COMMON_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port:  parseInt(process.env.COMMON_PORT, 10),
        },
      },
      {
        name: 'USER_SERVICE', // Add USER_SERVICE
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: parseInt(process.env.USER_PORT, 10), // Port for the user microservice
        },
      },
    ]),
  ],
  controllers: [AppController], // Remove UserController from here
  providers: [AppService],
})
export class AppModule {}


