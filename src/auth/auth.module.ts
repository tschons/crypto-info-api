import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GenerateTokenUseCase } from './use-cases/generate-token.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    JwtService,
    LocalStrategy,
    JwtStrategy,
    GenerateTokenUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
