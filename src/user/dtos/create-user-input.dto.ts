import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 80, { message: 'Password must be between 8 and 80 characters' })
  password: string;

  @ApiProperty({ description: 'Profile of the user' })
  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  profile: ProfileEnum;
}
