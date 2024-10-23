import { Injectable, NestMiddleware, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  async use(req, res, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
      throw new UnauthorizedException('No token provided...');
    }

    console.log(token);

    try {
        console.log("----------------------");
      const secretKey = this.configService.get<string>('JWT_SECRET_KEY'); // Access the secret from .env
      console.log(secretKey);
      const decoded: any = jwt.verify(token, secretKey); // Use your secret key
      console.log(decoded._id);
      const id = decoded._id; // Use your token payload structure

      // Log or inspect FormData if needed
      if (req.method === 'POST' && req.body) {
        console.log('Form Data:', req.body);
      }
      console.log(id);

      // Call CheckUser to validate user existence
      const user = await this.client.send({ cmd: 'findUser' }, id ).toPromise();
      console.log(user);

      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      req.user = user; // Attach user details to the request object

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Failed to authenticate token');
    }
  }
}
