export class NotConfiguredException extends Error {
  constructor(message?: string) {
    super(message || 'Not configured');
    this.name = 'NotConfiguredException';
  }
}
