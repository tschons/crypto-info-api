import { Module } from '@nestjs/common';
import { CryptoPriceRepository } from './crypto-price.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPriceEntity } from './crypto-price.entity';
import { CryptoController } from './crypto.controller';
import { CoingeckoService } from './services/coingecko.service';
import { HttpModule } from '@nestjs/axios';
import { GetCryptoPriceByIdUseCase } from './use-cases/get-crypto-price-by-id.use-case';
import { CryptoPriceOutputMapper } from './mappers/crypto-price-output.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPriceEntity]), HttpModule],
  providers: [
    {
      provide: 'CryptoPriceRepositoryInterface',
      useClass: CryptoPriceRepository,
    },
    {
      provide: 'CryptoInfoServiceInterface',
      useClass: CoingeckoService,
    },
    GetCryptoPriceByIdUseCase,
    CryptoPriceOutputMapper,
  ],
  controllers: [CryptoController],
})
export class CryptoModule {}
