import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CryptoPriceOutputDto } from './dtos/crypto-price-output.dto';
import { GetCryptoPriceByIdUseCase } from './use-cases/get-crypto-price-by-id.use-case';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly getCryptoPriceByIdUseCase: GetCryptoPriceByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Get a crypto price by id' })
  @Get('/:cryptoId')
  async getCryptoPriceById(
    @Param('cryptoId') cryptoId: string,
  ): Promise<CryptoPriceOutputDto> {
    return this.getCryptoPriceByIdUseCase.execute(cryptoId);
  }
}
