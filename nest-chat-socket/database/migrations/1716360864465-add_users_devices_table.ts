import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersDevicesTable1716360864465 implements MigrationInterface {
    name = 'AddUsersDevicesTable1716360864465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users_devices\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` varchar(36) NULL,
                \`deviceId\` varchar(36) NULL,
                \`socketId\` varchar(20) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`users_devices\`
        `);
    }

}
