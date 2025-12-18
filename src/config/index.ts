import { readFileSync } from 'fs';
import { join } from 'path';
import { IConfig } from './interfaces/config.interface';
import { RedisOptions } from 'ioredis';
import {
  defineConfig as definePGConfig,
  LoadStrategy,
} from '@mikro-orm/postgresql';

export function config(): IConfig {
  // Generate RSA keys: openssl genrsa -out private.key 2048
  // openssl rsa -in private.key -pubout -out public.key
  const publicKey = readFileSync(
    join(__dirname, '..', '..', 'keys', 'public.key'),
    'utf-8',
  );
  const privateKey = readFileSync(
    join(__dirname, '..', '..', 'keys', 'private.key'),
    'utf-8',
  );

  const testing = process.env.NODE_ENV !== 'production';
  const dbOptions = {
    entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
    entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
    loadStrategy: LoadStrategy.JOINED,
    allowGlobalContext: true,
  };

  // Redis URL parser
  const redisUrlParser = (url: string): RedisOptions => {
    if (url.includes('://:')) {
      const arr = url.split('://:')[1].split('@');
      const secondArr = arr[1].split(':');
      return {
        password: arr[0],
        host: secondArr[0],
        port: parseInt(secondArr[1], 10),
      };
    }
    const connectionString = url.split('://')[1];
    const arr = connectionString.split(':');
    return {
      host: arr[0],
      port: parseInt(arr[1], 10),
    };
  };

  return {
    id: process.env.APP_ID!,
    url: process.env.URL!,
    port: parseInt(process.env.PORT || '3000', 10),
    domain: process.env.DOMAIN!,
    db: definePGConfig({
      ...dbOptions,
      clientUrl: process.env.DATABASE_URL,
    }),
    redis: redisUrlParser(process.env.REDIS_URL!),
    jwt: {
      access: {
        privateKey,
        publicKey,
        time: parseInt(process.env.JWT_ACCESS_TIME!, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET!,
        time: parseInt(process.env.JWT_REFRESH_TIME!, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET!,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME!, 10),
      },
      resetPassword: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET!,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME!, 10),
      },
    },
    throttler: [
      {
        ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
      },
    ],
    testing,
  };
}
