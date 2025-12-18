import { Migration } from '@mikro-orm/migrations';

export class Migration20251218032111 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" serial primary key, "name" varchar not null, "username" varchar not null, "email" varchar not null, "password" varchar not null, "confirmed" boolean not null default false, "credentials_version" int not null default 0, "credentials_last_password" varchar(255) not null default '', "credentials_password_updated_at" int not null default 1766028071, "credentials_updated_at" int not null default 1766028071, "created_at" timestamptz not null, "updated_at" timestamptz not null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }
}
