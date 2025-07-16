import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenInputDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;
}
