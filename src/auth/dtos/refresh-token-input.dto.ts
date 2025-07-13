import { IsNotEmpty } from 'class-validator';

export class RefreshTokenInputDto {
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;
}
