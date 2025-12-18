import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';

describe('Config (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    config = app.get(ConfigService);
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  it('should load config correctly', (): void => {
    const port = config.get<number>('port');
    const domain = config.get<string>('domain');
    const jwtAccessTime = config.get<string>('jwt.access.time');
    expect(port).toBeDefined();
    expect(domain).toBeDefined();
    expect(jwtAccessTime).toBeDefined();
  });
});
