import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { GenerateTokenOutputDto } from '../dtos/generate-token-output.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';
import { AccessTokenPayload } from '../../shared/value-objects/access-token-payload';
import { RefreshTokenPayload } from '../../shared/value-objects/refresh-token-payload';

@Injectable()
export class GenerateTokenUseCase implements UseCaseInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    authenticatedUser: AuthenticatedUser,
  ): Promise<GenerateTokenOutputDto> {
    const generateTokenOutputDto = new GenerateTokenOutputDto();

    generateTokenOutputDto.accessToken =
      this.generateAccessToken(authenticatedUser);
    generateTokenOutputDto.refreshToken =
      this.generateRefreshToken(authenticatedUser);

    return generateTokenOutputDto;
  }

  private generateAccessToken(authenticatedUser: AuthenticatedUser): string {
    const tokenPayload: Omit<AccessTokenPayload, 'iat' | 'exp'> = {
      sub: authenticatedUser.userId,
      role: authenticatedUser.profile,
    };

    return this.jwtService.sign(
      { ...tokenPayload },
      {
        secret: this.configService.get('AUTH_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('AUTH_ACCESS_TOKEN_EXPIRATION'),
      },
    );
  }

  private generateRefreshToken(authenticatedUser: AuthenticatedUser): string {
    const tokenPayload: Omit<RefreshTokenPayload, 'iat' | 'exp'> = {
      sub: authenticatedUser.userId,
    };

    return this.jwtService.sign(
      { ...tokenPayload },
      {
        secret: this.configService.get('AUTH_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('AUTH_REFRESH_TOKEN_EXPIRATION'),
      },
    );
  }
}
