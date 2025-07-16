import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCryptoPricesAddUpdateDateColumn1752622496493
  implements MigrationInterface
{
  name = 'AlterCryptoPricesAddUpdateDateColumn1752622496493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` DROP COLUMN \`updatedAt\``,
    );
  }
}
