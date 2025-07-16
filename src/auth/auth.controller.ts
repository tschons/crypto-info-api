import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GenerateTokenOutputDto } from './dtos/generate-token-output.dto';
import { GenerateTokenUseCase } from './use-cases/generate-token.use-case';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { GenerateTokenInputDto } from './dtos/generate-token-input.dto';
import { RefreshTokenInputDto } from './dtos/refresh-token-input.dto';
import { AuthenticatedUser } from '../shared/value-objects/authenticated-user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @ApiOperation({ summary: 'Generate a access token with email and password' })
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: GenerateTokenInputDto })
  @Post('generate-token')
  async generateToken(@Request() request): Promise<GenerateTokenOutputDto> {
    const authenticatedUser: AuthenticatedUser = request.user;
    return this.generateTokenUseCase.execute(authenticatedUser);
  }

  @ApiOperation({ summary: 'Generate a access token with refresh token' })
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenInputDto: RefreshTokenInputDto,
  ): Promise<GenerateTokenOutputDto> {
    return this.refreshTokenUseCase.execute(refreshTokenInputDto);
  }
}
