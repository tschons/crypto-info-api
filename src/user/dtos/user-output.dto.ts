import { ProfileEnum } from '../../shared/enums/profile.enum';
import { Exclude } from 'class-transformer';

export class UserOutputDto {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: ProfileEnum;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  deletedAt?: Date;
}
