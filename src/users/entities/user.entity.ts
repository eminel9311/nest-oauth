import { Entity, PrimaryKey, Property, Embedded } from '@mikro-orm/core';
import { IsBoolean, IsEmail, IsString, Length, Matches } from 'class-validator';

export const NAME_REGEX = /(^[\\p{L}\\d'\\.\\s\\-]*$)/u;
export const SLUG_REGEX = /^[a-z\\d]+(?:(\\.|-|_)[a-z\\d]+)*$/;
export const BCRYPT_HASH_OR_UNSET =
  /(UNSET|(\\$2[abxy]?\\$\\d{1,2}\\$[A-Za-z\\d\\./]{53}))/;

import { CredentialsEmbeddable } from '../embeddables/credentials.embeddable';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  public id!: number;

  @Property({ columnType: 'varchar', length: 100 })
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name!: string;

  @Property({ columnType: 'varchar', length: 106 })
  @IsString()
  @Length(3, 106)
  @Matches(SLUG_REGEX)
  public username!: string;

  @Property({ columnType: 'varchar', length: 255 })
  @IsString()
  @IsEmail()
  @Length(5, 255)
  public email!: string;

  @Property({ columnType: 'varchar', length: 60 })
  @IsString()
  @Length(5, 60)
  @Matches(BCRYPT_HASH_OR_UNSET)
  public password!: string;

  @Property({ columnType: 'boolean', default: false })
  @IsBoolean()
  public confirmed: boolean = false;

  @Embedded(() => CredentialsEmbeddable)
  public credentials: CredentialsEmbeddable = new CredentialsEmbeddable();

  @Property({ onCreate: () => new Date() })
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
