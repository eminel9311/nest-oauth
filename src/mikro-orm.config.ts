import 'dotenv/config';
import { LoadStrategy, Options } from '@mikro-orm/core';
import { defineConfig as definePGConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations'; // <— thêm dòng này

const baseOptions = {
  entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
  entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
  loadStrategy: LoadStrategy.JOINED,
  allowGlobalContext: true,
};

const config: Options = definePGConfig({
  ...baseOptions,
  clientUrl: process.env.DATABASE_URL,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
  },
  extensions: [Migrator],
});

console.log('CONFIG LOADED', process.env.DATABASE_URL);

export default config;
