import { Controller, Get, Param } from '@nestjs/common';
import { CryptoPriceOutputDto } from './dtos/crypto-price-output.dto';
import { GetCryptoPriceByIdUseCase } from './use-cases/get-crypto-price-by-id.use-case';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly getCryptoPriceByIdUseCase: GetCryptoPriceByIdUseCase,
  ) {}

  @Get('/:cryptoId')
  async getCryptoPriceById(
    @Param('cryptoId') cryptoId: string,
  ): Promise<CryptoPriceOutputDto> {
    return this.getCryptoPriceByIdUseCase.execute(cryptoId);
  }
}
