import { ProfileEnum } from '../../shared/enums/profile.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty({ description: 'Id of the user' })
  id: string;

  @ApiProperty({ description: 'Name of the user' })
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  email: string;

  @ApiProperty({ description: 'Profile of the user' })
  profile: ProfileEnum;

  @ApiProperty({ description: 'Date of creation of the user' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of last update of the user' })
  updatedAt: Date;

  @Exclude()
  deletedAt?: Date;
}
