// test/test-db.spec.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { EntityManager } from '@mikro-orm/core';
import { UserEntity } from '../src/users/entities/user.entity';

describe('DB test', () => {
  it('should create and find user', async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const em = app.get(EntityManager);

    const user = em.create(UserEntity, {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'UNSET',
    });

    await em.persist(user).flush();

    const found = await em.findOne(UserEntity, { id: user.id });
    expect(found?.email).toBe('test@example.com');

    await app.close();
  });
});
