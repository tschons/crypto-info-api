import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { CryptoPriceRepositoryInterface } from '../interfaces/crypto-price-repository.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CryptoPriceOutputDto } from '../dtos/crypto-price-output.dto';
import { CryptoInfoServiceInterface } from '../interfaces/crypto-info-service.interface';
import { CryptoPriceOutputMapper } from '../mappers/crypto-price-output.mapper';
import { ConfigService } from '@nestjs/config';
import { CryptoPriceEntity } from '../crypto-price.entity';
import { NotConfiguredException } from '../../shared/exceptions/not-configured.exceptions';
import { ErrorEnum } from '../../shared/enums/error.enum';

@Injectable()
export class GetCryptoPriceByIdUseCase implements UseCaseInterface {
  constructor(
    @Inject('CryptoPriceRepositoryInterface')
    private readonly cryptoPriceRepository: CryptoPriceRepositoryInterface,
    @Inject('CryptoInfoServiceInterface')
    private readonly cryptoInfoService: CryptoInfoServiceInterface,
    private readonly configService: ConfigService,
    private readonly cryptoPriceOutputMapper: CryptoPriceOutputMapper,
    private readonly logger: Logger,
  ) {}

  async execute(cryptoId: string): Promise<CryptoPriceOutputDto> {
    try {
      const cryptoPrice = await this.getCryptoPriceFromDatabase(cryptoId);
      return this.cryptoPriceOutputMapper.fromCryptoPriceEntity(cryptoPrice);
    } catch (error) {
      if (error.name !== ErrorEnum.EntityNotFound) {
        this.logger.error(
          `Error getting crypto price from database: ${cryptoId}`,
          error.stack,
        );
        throw error;
      }
    }

    this.logger.debug('Not found in database, getting from service');

    try {
      return this.getCryptoPriceFromService(cryptoId);
    } catch (error) {
      this.logger.error(
        `Error getting crypto price from service: ${cryptoId}`,
        error.stack,
      );
      throw error;
    }
  }

  private async getCryptoPriceFromDatabase(
    cryptoId: string,
  ): Promise<CryptoPriceEntity> {
    const cacheInMinutes = this.configService.get<number>(
      'CRYPTO_PRICE_CACHE_MINUTES',
    );
    if (!cacheInMinutes)
      throw new NotConfiguredException(
        'CRYPTO_PRICE_CACHE_MINUTES is not defined',
      );

    return await this.cryptoPriceRepository.getCryptoPriceById(
      cryptoId,
      cacheInMinutes,
    );
  }

  private async getCryptoPriceFromService(
    cryptoId: string,
  ): Promise<CryptoPriceOutputDto> {
    const cryptoPriceOutputDto =
      await this.cryptoInfoService.getCryptoPriceById(cryptoId);
    const cyptoPrice =
      this.cryptoPriceOutputMapper.toCryptoPriceEntity(cryptoPriceOutputDto);
    await this.cryptoPriceRepository.createOrUpdateCryptoPrice(cyptoPrice);

    return cryptoPriceOutputDto;
  }
}
