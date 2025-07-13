import { ProfileEnum } from '../../shared/enums/profile.enum';

export class AccessTokenPayload {
  constructor(sub: string, role: ProfileEnum) {
    this.sub = sub;
    this.role = role;
  }

  sub: string;
  role: ProfileEnum;
  iat?: number;
  exp?: number;
}
