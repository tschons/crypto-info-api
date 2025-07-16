import { CryptoPriceEntity } from '../crypto-price.entity';

export interface CryptoPriceRepositoryInterface {
  createOrUpdateCryptoPrice(
    cryptoPriceEntity: CryptoPriceEntity,
  ): Promise<CryptoPriceEntity>;
  getCryptoPriceById(
    id: string,
    cacheInMinutes: number,
  ): Promise<CryptoPriceEntity>;
}
