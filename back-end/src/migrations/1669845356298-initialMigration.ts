import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1669845356298 implements MigrationInterface {
    name = 'initialMigration1669845356298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "password" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "password"`);
    }

}
