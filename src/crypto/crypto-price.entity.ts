import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('crypto_prices')
export class CryptoPriceEntity {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30 })
  symbol: string;

  @Column('decimal', { precision: 18, scale: 2 })
  marketCap: number;

  @Column('decimal', { precision: 10, scale: 4 })
  last24HoursVariation: number;

  @Column('decimal', { precision: 10, scale: 4 })
  last7DaysVariation: number;

  @Column('decimal', { precision: 24, scale: 12 })
  allTimeHigh: number;

  @Column('decimal', { precision: 24, scale: 12 })
  allTimeLow: number;

  @Column('decimal', { precision: 24, scale: 12 })
  currentPrice: number;
}
