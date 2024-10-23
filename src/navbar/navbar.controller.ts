// src/navbar/navbar.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('navbar')
export class NavbarController {
    constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

    @Post()
    async create(@Body() body: any) {
        try {
            return await this.client.send('create_navbar', body).toPromise(); // Send to microservice
        } catch (error) {
            console.error('Error creating navbar:', error);
            throw new Error('Failed to create navbar');
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.client.send('find_all_navbars', {}).toPromise(); // Send to microservice
        } catch (error) {
            console.error('Error fetching navbars:', error);
            throw new Error('Failed to fetch navbars');
        }
    }

    // Add more endpoints for update, delete, etc.
}
