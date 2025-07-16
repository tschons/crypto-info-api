import { ProfileEnum } from '../enums/profile.enum';
import { SetMetadata } from '@nestjs/common';

export const PROFILE_KEY = 'profile';
export const Profile = (profile: ProfileEnum) =>
  SetMetadata(PROFILE_KEY, profile);
