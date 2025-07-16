import { CryptoPriceRepositoryInterface } from './interfaces/crypto-price-repository.interface';
import { CryptoPriceEntity } from './crypto-price.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CryptoPriceRepository
  extends Repository<CryptoPriceEntity>
  implements CryptoPriceRepositoryInterface
{
  constructor(
    @InjectRepository(CryptoPriceEntity)
    repository: Repository<CryptoPriceEntity>,
    private readonly logger: Logger,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOrUpdateCryptoPrice(
    cryptoPriceEntity: CryptoPriceEntity,
  ): Promise<CryptoPriceEntity> {
    this.logger.debug(
      `Creating or updating crypto price: ${JSON.stringify(cryptoPriceEntity)}`,
    );
    return this.save(cryptoPriceEntity);
  }

  async getCryptoPriceById(
    id: string,
    cacheInMinutes: number,
  ): Promise<CryptoPriceEntity> {
    const xMinutesAgo = new Date(Date.now() - cacheInMinutes * 60 * 1000);
    this.logger.debug(`Getting crypto price by id: ${id}`);
    return this.findOneByOrFail({ id, updatedAt: MoreThan(xMinutesAgo) });
  }
}
