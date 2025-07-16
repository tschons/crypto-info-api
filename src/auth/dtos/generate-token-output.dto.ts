import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenOutputDto {
  @ApiProperty({ description: 'Access token, used to authenticate the user' })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token, used to refresh the access token',
  })
  refreshToken: string;
}
