import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);

  console.log('Config loaded:', {
    port: config.get('port'),
    domain: config.get('domain'),
    jwtAccessTime: config.get('jwt.access.time'),
  });

  await app.close();
}

test();
