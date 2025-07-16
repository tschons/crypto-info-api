import { Decimal } from 'decimal.js';
import { ApiProperty } from '@nestjs/swagger';

export class CryptoPriceOutputDto {
  @ApiProperty({ description: 'Id of the crypto' })
  id: string;

  @ApiProperty({ description: 'Name of the crypto' })
  name: string;

  @ApiProperty({ description: 'Symbol of the crypto' })
  symbol: string;

  @ApiProperty({ description: 'Market cap of the crypto' })
  marketCap: Decimal;

  @ApiProperty({ description: 'Variation of the crypto in the last 24 hours' })
  last24HoursVariation: Decimal;

  @ApiProperty({ description: 'Variation of the crypto in the last 7 days' })
  last7DaysVariation: Decimal;

  @ApiProperty({ description: 'All time high of the crypto' })
  allTimeHigh: Decimal;

  @ApiProperty({ description: 'All time low of the crypto' })
  allTimeLow: Decimal;

  @ApiProperty({ description: 'Current price of the crypto' })
  currentPrice: Decimal;

  @ApiProperty({ description: 'Date of the crypto price last update' })
  dateTime: Date;
}
