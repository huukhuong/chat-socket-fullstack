import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessagesTable1716275809507 implements MigrationInterface {
    name = 'AddMessagesTable1716275809507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`messages\` (
                \`id\` varchar(36) NOT NULL,
                \`content\` text NOT NULL,
                \`type\` varchar(255) NOT NULL DEFAULT 'text',
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`isEdited\` tinyint NOT NULL DEFAULT 0,
                \`senderId\` varchar(36) NOT NULL,
                \`receiverId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_acf951a58e3b9611dd96ce89042\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_acf951a58e3b9611dd96ce89042\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\`
        `);
        await queryRunner.query(`
            DROP TABLE \`messages\`
        `);
    }

}
