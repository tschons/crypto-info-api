export class RefreshTokenPayload {
  constructor(sub: string) {
    this.sub = sub;
  }

  sub: string;
  iat?: number;
  exp?: number;
}
