import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenInputDto {
  @ApiProperty({ description: 'Email to login' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ description: 'Password to login' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
