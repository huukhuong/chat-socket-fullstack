import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersOnlineStatusColumn1716370383842 implements MigrationInterface {
    name = 'AddUsersOnlineStatusColumn1716370383842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`isOnline\` tinyint NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`isOnline\`
        `);
    }

}
