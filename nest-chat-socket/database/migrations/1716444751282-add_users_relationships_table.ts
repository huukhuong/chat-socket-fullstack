import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersRelationshipsTable1716444751282 implements MigrationInterface {
    name = 'AddUsersRelationshipsTable1716444751282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users_relationships\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userFirstId\` varchar(36) NULL,
                \`userSecondId\` varchar(36) NULL,
                \`type\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`users_relationships\`
        `);
    }

}
