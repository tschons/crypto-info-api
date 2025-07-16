import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GenerateTokenUseCase } from './use-cases/generate-token.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { HashModule } from '../hash/hash.module';
import { BcryptHashService } from '../hash/services/bcrypt-hash.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({}), HashModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    LocalStrategy,
    JwtStrategy,
    GenerateTokenUseCase,
    RefreshTokenUseCase,
    Logger,
    {
      provide: 'HashServiceInterface',
      useClass: BcryptHashService,
    },
  ],
})
export class AuthModule {}
