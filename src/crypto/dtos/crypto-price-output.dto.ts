import { Decimal } from 'decimal.js';

export class CryptoPriceOutputDto {
  id: string;
  name: string;
  symbol: string;
  marketCap: Decimal;
  last24HoursVariation: Decimal;
  last7DaysVariation: Decimal;
  allTimeHigh: Decimal;
  allTimeLow: Decimal;
  currentPrice: Decimal;
  dateTime: Date;
}
