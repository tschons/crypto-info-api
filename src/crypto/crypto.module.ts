import { Module } from '@nestjs/common';
import { CryptoPriceRepository } from './crypto-price.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPriceEntity } from './crypto-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPriceEntity])],
  providers: [
    {
      provide: 'CryptoPriceRepositoryInterface',
      useClass: CryptoPriceRepository,
    },
  ],
})
export class CryptoModule {}
