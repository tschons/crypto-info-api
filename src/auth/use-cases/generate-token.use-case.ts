import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { GenerateTokenOutputDto } from '../dtos/generate-token-output.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';
import { AccessTokenPayload } from '../../shared/value-objects/access-token-payload';
import { RefreshTokenPayload } from '../../shared/value-objects/refresh-token-payload';
import { NotConfiguredException } from '../../shared/exceptions/not-configured.exceptions';

@Injectable()
export class GenerateTokenUseCase implements UseCaseInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  /**
   * Executes the generation of access and refresh tokens.
   *
   * @param authenticatedUser The authenticated user for whom to generate the tokens
   * @returns DTO containing the tokens
   */
  async execute(
    authenticatedUser: AuthenticatedUser,
  ): Promise<GenerateTokenOutputDto> {
    const generateTokenOutputDto = new GenerateTokenOutputDto();

    try {
      generateTokenOutputDto.accessToken =
        this.generateAccessToken(authenticatedUser);
      generateTokenOutputDto.refreshToken =
        this.generateRefreshToken(authenticatedUser);
    } catch (error) {
      this.logger.error(
        `Error generating token for user ${authenticatedUser.userId}`,
        error.stack,
      );

      throw error;
    }

    return generateTokenOutputDto;
  }

  private generateAccessToken(authenticatedUser: AuthenticatedUser): string {
    const tokenPayload: Omit<AccessTokenPayload, 'iat' | 'exp'> = {
      sub: authenticatedUser.userId,
      role: authenticatedUser.profile,
    };

    const accessTokenSecret = this.configService.get(
      'AUTH_ACCESS_TOKEN_SECRET',
    );
    if (!accessTokenSecret)
      throw new NotConfiguredException(
        'AUTH_ACCESS_TOKEN_SECRET is not defined',
      );

    const accessTokenExpiration = this.configService.get(
      'AUTH_ACCESS_TOKEN_EXPIRATION',
    );
    if (!accessTokenExpiration)
      throw new NotConfiguredException(
        'AUTH_ACCESS_TOKEN_EXPIRATION is not defined',
      );

    return this.jwtService.sign(
      { ...tokenPayload },
      {
        secret: accessTokenSecret,
        expiresIn: accessTokenExpiration,
      },
    );
  }

  private generateRefreshToken(authenticatedUser: AuthenticatedUser): string {
    const tokenPayload: Omit<RefreshTokenPayload, 'iat' | 'exp'> = {
      sub: authenticatedUser.userId,
    };

    const refreshTokenSecret = this.configService.get(
      'AUTH_REFRESH_TOKEN_SECRET',
    );
    if (!refreshTokenSecret)
      throw new NotConfiguredException(
        'AUTH_REFRESH_TOKEN_SECRET is not defined',
      );

    const refreshTokenExpiration = this.configService.get(
      'AUTH_REFRESH_TOKEN_EXPIRATION',
    );
    if (!refreshTokenExpiration)
      throw new NotConfiguredException(
        'AUTH_REFRESH_TOKEN_EXPIRATION is not defined',
      );

    return this.jwtService.sign(
      { ...tokenPayload },
      {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpiration,
      },
    );
  }
}
