import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserInputDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @IsOptional()
  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  profile?: ProfileEnum;
}
