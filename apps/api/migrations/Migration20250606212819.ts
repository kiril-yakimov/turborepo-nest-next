import { Migration } from '@mikro-orm/migrations';

export class Migration20250606212819 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" varchar(255) not null, "keycloak_id" varchar(255) not null, "status" text check ("status" in ('active', 'inactive')) not null default 'active', "created_at" timestamptz not null, "updated_at" timestamptz null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`create index "users_keycloak_id_index" on "users" ("keycloak_id");`);
    this.addSql(`create index "users_status_index" on "users" ("status");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
