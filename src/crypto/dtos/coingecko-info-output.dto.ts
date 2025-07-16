export class CoingeckoInfoOutputDto {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  ath: number;
  atl: number;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  last_updated: Date;
}
