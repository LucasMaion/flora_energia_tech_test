import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747703198508 implements MigrationInterface {
    name = 'Init1747703198508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_search_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "word_id" integer, CONSTRAINT "PK_3628fe7607121da05bf51f73119" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_search_history_pkey" ON "user_search_history" ("id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" text NOT NULL, "password" text NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_pkey" ON "user" ("id") `);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "word_id" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "favorite_pkey" ON "favorite" ("id") `);
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "word" text NOT NULL, CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff" UNIQUE ("word"), CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "word_pkey" ON "word" ("id") `);
        await queryRunner.query(`CREATE TABLE "data_seed_status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" text NOT NULL DEFAULT false, "is_seeded" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_06c4aa22bb632b072bc4a6c3f66" UNIQUE ("name"), CONSTRAINT "UQ_de2ee2832833d9f0b5718f97b89" UNIQUE ("is_seeded"), CONSTRAINT "PK_cab123fe0f7577d24714850ba10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "data_seed_status_pkey" ON "data_seed_status" ("id") `);
        await queryRunner.query(`ALTER TABLE "user_search_history" ADD CONSTRAINT "FK_1994a941cf2100dba32dafb9c80" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_search_history" ADD CONSTRAINT "FK_71e0a5f5a47d8b25a6545f4068c" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_323c19bcdaf46b6336093454bc5" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_323c19bcdaf46b6336093454bc5"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
        await queryRunner.query(`ALTER TABLE "user_search_history" DROP CONSTRAINT "FK_71e0a5f5a47d8b25a6545f4068c"`);
        await queryRunner.query(`ALTER TABLE "user_search_history" DROP CONSTRAINT "FK_1994a941cf2100dba32dafb9c80"`);
        await queryRunner.query(`DROP INDEX "public"."data_seed_status_pkey"`);
        await queryRunner.query(`DROP TABLE "data_seed_status"`);
        await queryRunner.query(`DROP INDEX "public"."word_pkey"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP INDEX "public"."favorite_pkey"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP INDEX "public"."user_pkey"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."user_search_history_pkey"`);
        await queryRunner.query(`DROP TABLE "user_search_history"`);
    }

}
