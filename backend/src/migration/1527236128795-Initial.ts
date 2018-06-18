import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1527236128795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "blog_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "postId" uuid, CONSTRAINT "PK_e4abd1ac56d0cfd86bd57c87a06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "zipCode" character varying(16) NOT NULL, "houseNumber" character varying(8) NOT NULL, "userId" uuid, CONSTRAINT "REL_7bfd0ddebaace17c1af2d4d9e2" UNIQUE ("userId"), CONSTRAINT "PK_c5e62b7ecb204241c50cecadf26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "creationDate" TIMESTAMP NOT NULL, "userAgent" character varying NOT NULL, "ipAddress" character varying NOT NULL, "lastUsed" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "admin" boolean NOT NULL DEFAULT false, "membershipId" integer NOT NULL, "membershipSection" character varying(128) NOT NULL, "email" character varying NOT NULL, "password" character varying(60) NOT NULL, "creationDate" TIMESTAMP NOT NULL, "approved" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9ff85c3022ae20faa55b0d12bf1" UNIQUE ("membershipId"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "creationDate" TIMESTAMP NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "authorId" uuid, CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "order" integer NOT NULL, "hidden" boolean NOT NULL, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_block_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying, "type" integer, "size" integer, "breakpoint" integer, "image" character varying, "height" integer, "blockId" uuid, "targetId" uuid, CONSTRAINT "REL_2f76143de8079740c516891730" UNIQUE ("blockId"), CONSTRAINT "PK_a91d92be9139a3cef4766072ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_block" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "order" integer, "parentData" integer, "hidden" boolean NOT NULL, "pageId" uuid, "parentId" uuid, CONSTRAINT "PK_5ae4d6280a3061d923b9011bee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_guard" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "pageId" uuid, "targetId" uuid, CONSTRAINT "PK_ea87fc5d9150abc85640ed51414" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "type" character varying, "hidden" boolean NOT NULL, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_target" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "columnId" uuid, "targetId" uuid, CONSTRAINT "PK_428e1738af53dc51087c18c70d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "order" integer NOT NULL, "itemId" uuid, CONSTRAINT "PK_4a8f5dddf9996fe05e1f38a4c07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_tag" ADD CONSTRAINT "FK_ef259df86b1d22b519ec78365e9" FOREIGN KEY ("postId") REFERENCES "blog_post"("id")`);
        await queryRunner.query(`ALTER TABLE "contact_data" ADD CONSTRAINT "FK_7bfd0ddebaace17c1af2d4d9e2a" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_657e11001f05ef48b5383f5a637" FOREIGN KEY ("authorId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "page_block_data" ADD CONSTRAINT "FK_2f76143de8079740c516891730e" FOREIGN KEY ("blockId") REFERENCES "page_block"("id")`);
        await queryRunner.query(`ALTER TABLE "page_block_data" ADD CONSTRAINT "FK_99f67a469f6f05249d4f68c1766" FOREIGN KEY ("targetId") REFERENCES "page"("id")`);
        await queryRunner.query(`ALTER TABLE "page_block" ADD CONSTRAINT "FK_68d5c9692577a5c5e3ad2fffdf2" FOREIGN KEY ("pageId") REFERENCES "page"("id")`);
        await queryRunner.query(`ALTER TABLE "page_block" ADD CONSTRAINT "FK_db245513e1430f4f3f48f305fda" FOREIGN KEY ("parentId") REFERENCES "page_block"("id")`);
        await queryRunner.query(`ALTER TABLE "page_guard" ADD CONSTRAINT "FK_27a740a7f04eb71fd1a2a053ac4" FOREIGN KEY ("pageId") REFERENCES "page"("id")`);
        await queryRunner.query(`ALTER TABLE "page_guard" ADD CONSTRAINT "FK_0f1cf57a7781ca0421a8efcfeab" FOREIGN KEY ("targetId") REFERENCES "page"("id")`);
        await queryRunner.query(`ALTER TABLE "menu_target" ADD CONSTRAINT "FK_324ded5c74c0ac3b0eb8b9a9d54" FOREIGN KEY ("columnId") REFERENCES "menu_column"("id")`);
        await queryRunner.query(`ALTER TABLE "menu_target" ADD CONSTRAINT "FK_1087d270bd0c7b01ef94a432faf" FOREIGN KEY ("targetId") REFERENCES "page"("id")`);
        await queryRunner.query(`ALTER TABLE "menu_column" ADD CONSTRAINT "FK_1969f6c9e05e6400919e5a51f71" FOREIGN KEY ("itemId") REFERENCES "menu_item"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "menu_column" DROP CONSTRAINT "FK_1969f6c9e05e6400919e5a51f71"`);
        await queryRunner.query(`ALTER TABLE "menu_target" DROP CONSTRAINT "FK_1087d270bd0c7b01ef94a432faf"`);
        await queryRunner.query(`ALTER TABLE "menu_target" DROP CONSTRAINT "FK_324ded5c74c0ac3b0eb8b9a9d54"`);
        await queryRunner.query(`ALTER TABLE "page_guard" DROP CONSTRAINT "FK_0f1cf57a7781ca0421a8efcfeab"`);
        await queryRunner.query(`ALTER TABLE "page_guard" DROP CONSTRAINT "FK_27a740a7f04eb71fd1a2a053ac4"`);
        await queryRunner.query(`ALTER TABLE "page_block" DROP CONSTRAINT "FK_db245513e1430f4f3f48f305fda"`);
        await queryRunner.query(`ALTER TABLE "page_block" DROP CONSTRAINT "FK_68d5c9692577a5c5e3ad2fffdf2"`);
        await queryRunner.query(`ALTER TABLE "page_block_data" DROP CONSTRAINT "FK_99f67a469f6f05249d4f68c1766"`);
        await queryRunner.query(`ALTER TABLE "page_block_data" DROP CONSTRAINT "FK_2f76143de8079740c516891730e"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_657e11001f05ef48b5383f5a637"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "contact_data" DROP CONSTRAINT "FK_7bfd0ddebaace17c1af2d4d9e2a"`);
        await queryRunner.query(`ALTER TABLE "blog_tag" DROP CONSTRAINT "FK_ef259df86b1d22b519ec78365e9"`);
        await queryRunner.query(`DROP TABLE "menu_column"`);
        await queryRunner.query(`DROP TABLE "menu_target"`);
        await queryRunner.query(`DROP TABLE "page"`);
        await queryRunner.query(`DROP TABLE "page_guard"`);
        await queryRunner.query(`DROP TABLE "page_block"`);
        await queryRunner.query(`DROP TABLE "page_block_data"`);
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TABLE "blog_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "contact_data"`);
        await queryRunner.query(`DROP TABLE "blog_tag"`);
    }

}
