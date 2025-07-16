import { Decimal } from 'decimal.js';

export class DecimalColumnTransformer {
  to(decimal: Decimal): string {
    return decimal !== null && decimal !== undefined ? decimal.toString() : '';
  }

  from(numberAsString: string): Decimal {
    if (
      numberAsString === null ||
      numberAsString === undefined ||
      numberAsString === ''
    ) {
      return new Decimal(0);
    }
    return new Decimal(numberAsString);
  }
}
