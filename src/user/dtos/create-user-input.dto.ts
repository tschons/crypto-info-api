import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export class CreateUserInputDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 80, { message: 'Password must be between 8 and 80 characters' })
  password: string;

  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  profile: ProfileEnum;
}
