import { CryptoPriceRepositoryInterface } from './interfaces/crypto-price-repository.interface';
import { CryptoPriceEntity } from './crypto-price.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoPriceRepository
  extends Repository<CryptoPriceEntity>
  implements CryptoPriceRepositoryInterface
{
  constructor(
    @InjectRepository(CryptoPriceEntity)
    repository: Repository<CryptoPriceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOrUpdateCryptoPrice(
    cryptoPriceEntity: CryptoPriceEntity,
  ): Promise<CryptoPriceEntity> {
    return this.save(cryptoPriceEntity);
  }

  async getCryptoPriceById(id: string): Promise<CryptoPriceEntity> {
    return this.findOneByOrFail({ id });
  }

  async getCryptoPriceBySymbol(symbol: string): Promise<CryptoPriceEntity> {
    return this.findOneByOrFail({ symbol });
  }
}
