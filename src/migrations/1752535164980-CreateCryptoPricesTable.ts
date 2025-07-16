import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCryptoPricesTable1752535164980
  implements MigrationInterface
{
  name = 'CreateCryptoPricesTable1752535164980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`crypto_prices\` (\`id\` varchar(50) NOT NULL, \`name\` varchar(100) NOT NULL, \`symbol\` varchar(30) NOT NULL, \`marketCap\` decimal(18,2) NOT NULL, \`last24HoursVariation\` decimal(10,4) NOT NULL, \`last7DaysVariation\` decimal(10,4) NOT NULL, \`allTimeHigh\` decimal(24,12) NOT NULL, \`allTimeLow\` decimal(24,12) NOT NULL, \`currentPrice\` decimal(24,12) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`crypto_prices\``);
  }
}
