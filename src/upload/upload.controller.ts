import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Multer storage configuration
const storage = diskStorage({
    destination: (req, file, cb) => {
        // Set the destination to the 'uploads' directory outside of 'src'
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
       
        const safeFilename = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        cb(null, safeFilename);
    },
});

@Controller('upload')
export class UploadController {
    constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new BadRequestException('File is required');
            }

            // Optionally send the file information to a microservice
            const result = await this.client.send('upload_file', {
                originalname: file.originalname,
                filename: file.filename,
            }).toPromise();
console.log(result, "______________________-",file);
            // Construct the blob URL
            const blobUrl = `http://localhost:3001/public/${file.filename}`;
            return { message: 'File uploaded successfully', blobUrl, result };
        } catch (error) {
            console.error('Upload error:', error);
            throw new BadRequestException('Error processing file', error.message);
        }
    }
}
