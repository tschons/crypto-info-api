import { ProfileEnum } from '../enums/profile.enum';

export class AuthenticatedUser {
  constructor(userId: string, profile: ProfileEnum) {
    this.userId = userId;
    this.profile = profile;
  }

  userId: string;
  profile: ProfileEnum;
}
