import { IsEmail, IsNotEmpty } from 'class-validator';

export class GenerateTokenInputDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
