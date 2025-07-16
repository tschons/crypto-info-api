import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordInputDto {
  @ApiProperty({ description: 'Current password of the user' })
  @Length(6, 80, { message: 'Password must be between 8 and 80 characters' })
  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword: string;

  @ApiProperty({ description: 'New password of the user' })
  @IsNotEmpty({ message: 'New password is required' })
  @Length(6, 80, {
    message: 'New password must be between 8 and 80 characters',
  })
  newPassword: string;
}
