import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentType } from './shared/types/environment.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const socketPath = configService.get<string>('DATABASE_SOCKET');

        return {
          type: 'mysql',
          host: socketPath
            ? undefined
            : configService.get<string>('DATABASE_HOST'),
          port: socketPath
            ? undefined
            : configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [],
          synchronize:
            configService.get<EnvironmentType>('ENVIRONMENT') === 'development',
          extra: socketPath
            ? {
                socketPath: socketPath,
              }
            : undefined,
        };
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
