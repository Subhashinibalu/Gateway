// src/footer/footer.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('footer')
export class FooterController {
    constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

    @Post()
    async create(@Body() body: any) {
        try {
            console.log(body);
            return await this.client.send('create_footer', body).toPromise(); // Send to microservice
        } catch (error) {
            console.error('Error creating footer:', error);
            throw new Error('Failed to create footer');
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.client.send('find_all_footers', {}).toPromise(); // Send to microservice
        } catch (error) {
            console.error('Error fetching footers:', error);
            throw new Error('Failed to fetch footers');
        }
    }

    // Add more endpoints for update, delete, etc.
}
