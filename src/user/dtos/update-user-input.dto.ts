import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserInputDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @ApiPropertyOptional({ description: 'Profile of the user' })
  @IsOptional()
  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  profile?: ProfileEnum;
}
