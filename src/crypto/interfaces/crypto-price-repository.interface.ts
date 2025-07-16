import { CryptoPriceEntity } from '../crypto-price.entity';

export interface CryptoPriceRepositoryInterface {
  createOrUpdateCryptoPrice(
    cryptoPriceEntity: CryptoPriceEntity,
  ): Promise<CryptoPriceEntity>;
  getCryptoPriceById(
    id: string,
    maxTimeGap: number,
  ): Promise<CryptoPriceEntity>;
  getCryptoPriceBySymbol(symbol: string): Promise<CryptoPriceEntity>;
}
