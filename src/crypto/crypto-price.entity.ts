import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Decimal } from 'decimal.js';
import { DecimalColumnTransformer } from './transformers/decimal-column.transformer';

@Entity('crypto_prices')
export class CryptoPriceEntity {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30 })
  symbol: string;

  @Column('decimal', {
    precision: 18,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  marketCap: Decimal;

  @Column('decimal', {
    precision: 24,
    scale: 18,
    transformer: new DecimalColumnTransformer(),
  })
  last24HoursVariation: Decimal;

  @Column('decimal', {
    precision: 24,
    scale: 18,
    transformer: new DecimalColumnTransformer(),
  })
  last7DaysVariation: Decimal;

  @Column('decimal', {
    precision: 24,
    scale: 12,
    transformer: new DecimalColumnTransformer(),
  })
  allTimeHigh: Decimal;

  @Column('decimal', {
    precision: 24,
    scale: 12,
    transformer: new DecimalColumnTransformer(),
  })
  allTimeLow: Decimal;

  @Column('decimal', {
    precision: 24,
    scale: 12,
    transformer: new DecimalColumnTransformer(),
  })
  currentPrice: Decimal;

  @Column()
  dateTime: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
