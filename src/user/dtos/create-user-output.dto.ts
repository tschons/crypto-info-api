import { ProfileEnum } from '../../shared/enums/profile.enum';

export class CreateUserOutputDto {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: ProfileEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
