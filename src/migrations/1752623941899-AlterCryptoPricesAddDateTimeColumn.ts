import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCryptoPricesAddDateTimeColumn1752623941899
  implements MigrationInterface
{
  name = 'AlterCryptoPricesAddDateTimeColumn1752623941899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` ADD \`dateTime\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` DROP COLUMN \`dateTime\``,
    );
  }
}
