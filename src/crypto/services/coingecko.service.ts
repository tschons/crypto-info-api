import { CryptoInfoServiceInterface } from '../interfaces/crypto-info-service.interface';
import { CryptoPriceOutputDto } from '../dtos/crypto-price-output.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PeriodEnum } from '../enums/period.enum';
import { CoingeckoInfoOutputDto } from '../dtos/coingecko-info-output.dto';
import { CryptoPriceOutputMapper } from '../mappers/crypto-price-output.mapper';
import { plainToInstance } from 'class-transformer';
import { AxiosResponse } from 'axios';

@Injectable()
export class CoingeckoService implements CryptoInfoServiceInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly cryptoPriceOutputMapper: CryptoPriceOutputMapper,
  ) {}

  async getCryptoPriceById(cryptoId: string): Promise<CryptoPriceOutputDto> {
    const coinGeckoApiUrl = this.configService.get<string>('COINGECKO_API_URL');
    if (!coinGeckoApiUrl) throw new Error('COINGECKO_API_URL is not defined');

    const httpHeaders = this.getHttpHeaders();
    const queryParams = this.getQueryParams(cryptoId);
    const apiResponse = await firstValueFrom(
      this.httpService.get(coinGeckoApiUrl, {
        headers: httpHeaders,
        params: queryParams,
        responseType: 'json',
      }),
    );
    const coingeckoInfoOutputDto = this.extractDtoFromResponse(
      cryptoId,
      apiResponse,
    );
    return this.cryptoPriceOutputMapper.fromCoingeckoInfoOutputDto(
      coingeckoInfoOutputDto,
    );
  }

  private extractDtoFromResponse(
    cryptoId: string,
    apiResponse: AxiosResponse,
  ): CoingeckoInfoOutputDto {
    if (apiResponse.status !== 200)
      throw new Error(
        `Error getting crypto price from Coingecko API: ${apiResponse.statusText}`,
      );

    if (!Array.isArray(apiResponse.data) || !apiResponse.data.length)
      throw new NotFoundException(`Crypto with id ${cryptoId} not found`);

    return plainToInstance(CoingeckoInfoOutputDto, apiResponse.data[0]);
  }

  private getHttpHeaders(): object {
    const coinGeckoApiKey = this.configService.get<string>('COINGECKO_API_KEY');
    if (!coinGeckoApiKey) throw new Error('COINGECKO_API_KEY is not defined');

    return {
      'x-cg-demo-api-key': coinGeckoApiKey,
    };
  }

  private getQueryParams(cryptoId: string): object {
    const targetFiatCurrency = this.configService.get<string>(
      'CRYPTO_TARGET_FIAT_CURRENCY',
    );

    if (!targetFiatCurrency)
      throw new Error(': CRYPTO_TARGET_FIAT_CURRENCY is not defined');

    return {
      ids: cryptoId.toLowerCase(),
      vs_currency: targetFiatCurrency.toLowerCase(),
      price_change_percentage: [PeriodEnum._7Days, PeriodEnum._24Hours].join(
        ',',
      ),
    };
  }
}
