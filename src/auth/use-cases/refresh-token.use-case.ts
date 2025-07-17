import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { GenerateTokenOutputDto } from '../dtos/generate-token-output.dto';
import {
  BadRequestException,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryInterface } from 'src/user/interfaces/user-repository.interface';
import { GenerateTokenUseCase } from './generate-token.use-case';
import { RefreshTokenInputDto } from '../dtos/refresh-token-input.dto';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';
import { RefreshTokenPayload } from '../../shared/value-objects/refresh-token-payload';
import { NotConfiguredException } from '../../shared/exceptions/not-configured.exceptions';
import { ErrorEnum } from '../../shared/enums/error.enum';

export class RefreshTokenUseCase implements UseCaseInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  async execute(
    refreshTokenInputDto: RefreshTokenInputDto,
  ): Promise<GenerateTokenOutputDto> {
    try {
      const refreshTokenPayload = this.validateRefreshToken(
        refreshTokenInputDto.refreshToken,
      );
      const user = await this.userRepository.getUserById(
        refreshTokenPayload.sub,
        false,
      );
      const authenticatedUser = new AuthenticatedUser(user.id, user.profile);

      return this.generateTokenUseCase.execute(authenticatedUser);
    } catch (error) {
      if (error.name !== ErrorEnum.Unauthorized)
        this.logger.error('Error refreshing token for user', error.stack);

      throw error;
    }
  }

  private validateRefreshToken(refreshToken: string): RefreshTokenPayload {
    const refreshTokenSecret = this.configService.get(
      'AUTH_REFRESH_TOKEN_SECRET',
    );
    if (!refreshTokenSecret)
      throw new NotConfiguredException(
        'AUTH_REFRESH_TOKEN_SECRET is not defined',
      );

    try {
      return this.jwtService.verify(refreshToken, {
        secret: refreshTokenSecret,
      });
    } catch (error) {
      switch (error.name) {
        case ErrorEnum.jsonWebToken:
          throw new UnauthorizedException('Invalid refresh token');
        case ErrorEnum.TokenExpired:
          throw new UnauthorizedException('Refresh token expired');
        default:
          throw new UnauthorizedException(error.message);
      }
    }
  }
}
