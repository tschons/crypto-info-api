import { CryptoPriceOutputDto } from '../dtos/crypto-price-output.dto';

export interface CryptoInfoServiceInterface {
  getCryptoPriceById(cryptoId: string): Promise<CryptoPriceOutputDto>;
}
