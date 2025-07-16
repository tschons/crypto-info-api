import { CoingeckoInfoOutputDto } from '../dtos/coingecko-info-output.dto';
import { CryptoPriceOutputDto } from '../dtos/crypto-price-output.dto';
import { Injectable } from '@nestjs/common';
import { CryptoPriceEntity } from '../crypto-price.entity';
import { Decimal } from 'decimal.js';

@Injectable()
export class CryptoPriceOutputMapper {
  fromCoingeckoInfoOutputDto(coingeckoInfoOutputDto: CoingeckoInfoOutputDto) {
    const cryptoPriceOutputDto = new CryptoPriceOutputDto();
    cryptoPriceOutputDto.id = coingeckoInfoOutputDto.id;
    cryptoPriceOutputDto.name = coingeckoInfoOutputDto.name;
    cryptoPriceOutputDto.symbol = coingeckoInfoOutputDto.symbol;
    cryptoPriceOutputDto.marketCap = new Decimal(
      coingeckoInfoOutputDto.market_cap,
    );
    cryptoPriceOutputDto.allTimeHigh = new Decimal(coingeckoInfoOutputDto.ath);
    cryptoPriceOutputDto.allTimeLow = new Decimal(coingeckoInfoOutputDto.atl);
    cryptoPriceOutputDto.currentPrice = new Decimal(
      coingeckoInfoOutputDto.current_price,
    );
    cryptoPriceOutputDto.last24HoursVariation = new Decimal(
      coingeckoInfoOutputDto.price_change_percentage_24h_in_currency,
    );
    cryptoPriceOutputDto.last7DaysVariation = new Decimal(
      coingeckoInfoOutputDto.price_change_percentage_7d_in_currency,
    );
    cryptoPriceOutputDto.dateTime = new Date(
      coingeckoInfoOutputDto.last_updated,
    );

    return cryptoPriceOutputDto;
  }

  fromCryptoPriceEntity(cryptoPrice: CryptoPriceEntity) {
    const cryptoPriceOutputDto = new CryptoPriceOutputDto();
    cryptoPriceOutputDto.id = cryptoPrice.id;
    cryptoPriceOutputDto.name = cryptoPrice.name;
    cryptoPriceOutputDto.symbol = cryptoPrice.symbol;
    cryptoPriceOutputDto.marketCap = cryptoPrice.marketCap;
    cryptoPriceOutputDto.allTimeHigh = cryptoPrice.allTimeHigh;
    cryptoPriceOutputDto.allTimeLow = cryptoPrice.allTimeLow;
    cryptoPriceOutputDto.currentPrice = cryptoPrice.currentPrice;
    cryptoPriceOutputDto.last24HoursVariation =
      cryptoPrice.last24HoursVariation;
    cryptoPriceOutputDto.last7DaysVariation = cryptoPrice.last7DaysVariation;
    cryptoPriceOutputDto.dateTime = cryptoPrice.dateTime;

    return cryptoPriceOutputDto;
  }

  toCryptoPriceEntity(
    cryptoPriceOutputDto: CryptoPriceOutputDto,
  ): CryptoPriceEntity {
    const cryptoPrice = new CryptoPriceEntity();
    cryptoPrice.id = cryptoPriceOutputDto.id;
    cryptoPrice.name = cryptoPriceOutputDto.name;
    cryptoPrice.symbol = cryptoPriceOutputDto.symbol;
    cryptoPrice.marketCap = cryptoPriceOutputDto.marketCap;
    cryptoPrice.allTimeHigh = cryptoPriceOutputDto.allTimeHigh;
    cryptoPrice.allTimeLow = cryptoPriceOutputDto.allTimeLow;
    cryptoPrice.currentPrice = cryptoPriceOutputDto.currentPrice;
    cryptoPrice.last24HoursVariation =
      cryptoPriceOutputDto.last24HoursVariation;
    cryptoPrice.last7DaysVariation = cryptoPriceOutputDto.last7DaysVariation;
    cryptoPrice.dateTime = cryptoPriceOutputDto.dateTime;

    return cryptoPrice;
  }
}
