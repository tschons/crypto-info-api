import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: ['.env.local', '.env'] });

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_SOCKET ? undefined : process.env.DATABASE_HOST,
  port: process.env.DATABASE_SOCKET
    ? undefined
    : parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  extra: process.env.DATABASE_SOCKET
    ? { socketPath: process.env.DATABASE_SOCKET }
    : undefined,
};

export default config;
export const dataSource = new DataSource(config as DataSourceOptions);
