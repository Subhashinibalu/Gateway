import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export function getConnection  (connection) {
 

    return {
        provide: connection,
        useFactory: (configService: ConfigService) => {
            return ClientProxyFactory.create( {
                transport: Transport.TCP,
                options: {
                    host: configService.get(`${connection}_HOST`),
                    port: configService.get(`${connection}_PORT`),
                },
            })
        },
        inject: [ConfigService],
    };
};

export const commonService = getConnection("COMMON_SERVICE")
export const userService = getConnection("USER_SERVICE")