import { NestApplicationOptions } from "@nestjs/common";

export const applicationOptions: NestApplicationOptions = {
    logger: [
        'debug',
        'error',
        'warn',
        'log',
        'verbose',
    ]
}
