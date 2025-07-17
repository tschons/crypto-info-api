export class DuplicateKeyException extends Error {
  constructor(message?: string) {
    super(message || 'Duplicate key');
    this.name = 'DuplicateKeyException';
  }
}
