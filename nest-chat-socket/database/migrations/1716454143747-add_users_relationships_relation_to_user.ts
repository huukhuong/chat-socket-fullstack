import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersRelationshipsRelationToUser1716454143747 implements MigrationInterface {
    name = 'AddUsersRelationshipsRelationToUser1716454143747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users_relationships\`
            ADD CONSTRAINT \`FK_86e1f3b2abcbf0b0f938c5ccd47\` FOREIGN KEY (\`userFirstId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_relationships\`
            ADD CONSTRAINT \`FK_1460380e76fbe4500deb2e3a24d\` FOREIGN KEY (\`userSecondId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users_relationships\` DROP FOREIGN KEY \`FK_1460380e76fbe4500deb2e3a24d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_relationships\` DROP FOREIGN KEY \`FK_86e1f3b2abcbf0b0f938c5ccd47\`
        `);
    }

}
