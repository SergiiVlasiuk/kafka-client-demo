import { SetMetadata } from '@nestjs/common';

export const Log = (...args: string[]) => SetMetadata('log', args);
