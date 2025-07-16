import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCryptoPricesVariationDecimalPrecision1752619307230
  implements MigrationInterface
{
  name = 'AlterCryptoPricesVariationDecimalPrecision1752619307230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` CHANGE \`last24HoursVariation\` \`last24HoursVariation\` decimal(24,18) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` CHANGE \`last7DaysVariation\` \`last7DaysVariation\` decimal(24,18) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` CHANGE \`last7DaysVariation\` \`last7DaysVariation\` decimal(21,15) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crypto_prices\` CHANGE \`last24HoursVariation\` \`last24HoursVariation\` decimal(21,15) NOT NULL`,
    );
  }
}
