import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { GenerateTokenOutputDto } from '../dtos/generate-token-output.dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryInterface } from 'src/user/interfaces/user-repository.interface';
import { GenerateTokenUseCase } from './generate-token.use-case';
import { RefreshTokenInputDto } from '../dtos/refresh-token-input.dto';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';
import { RefreshTokenPayload } from '../../shared/value-objects/refresh-token-payload';

export class RefreshTokenUseCase implements UseCaseInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    RefreshTokenInputDto: RefreshTokenInputDto,
  ): Promise<GenerateTokenOutputDto> {
    if (!RefreshTokenInputDto)
      throw new UnauthorizedException('Empty refresh token');

    let refreshTokenPayload: RefreshTokenPayload;
    try {
      refreshTokenPayload = this.jwtService.verify(
        RefreshTokenInputDto.refreshToken,
        {
          secret: this.configService.get<string>('AUTH_REFRESH_TOKEN_SECRET'),
        },
      );
    } catch (error) {
      switch (error.name) {
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid refresh token');
        case 'TokenExpiredError':
          throw new UnauthorizedException('Refresh token expired');
        default:
          throw new UnauthorizedException(error.name);
      }
    }

    const user = await this.userRepository.getUserById(refreshTokenPayload.sub);
    const authenticatedUser = new AuthenticatedUser(user.id, user.profile);

    return this.generateTokenUseCase.execute(authenticatedUser);
  }
}
