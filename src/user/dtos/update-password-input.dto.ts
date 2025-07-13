import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordInputDto {
  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword: string;

  @IsNotEmpty({ message: 'New password is required' })
  @Length(6, 80, { message: 'Password must be between 8 and 80 characters' })
  newPassword: string;
}
