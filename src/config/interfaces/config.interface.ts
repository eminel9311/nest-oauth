import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { RedisOptions } from 'ioredis';

export interface IJwt {
  access: {
    privateKey: string;
    publicKey: string;
    time: number;
  };
  refresh: {
    secret: string;
    time: number;
  };
  confirmation: {
    secret: string;
    time: number;
  };
  resetPassword: {
    secret: string;
    time: number;
  };
}

export interface IConfig {
  readonly id: string;
  readonly url: string;
  readonly port: number;
  readonly domain: string;
  readonly db: MikroOrmModuleOptions;
  readonly redis: RedisOptions;
  readonly jwt: IJwt;
  readonly throttler: ThrottlerModuleOptions;
  readonly testing: boolean;
}
