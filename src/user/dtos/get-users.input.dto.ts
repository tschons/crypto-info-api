import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { UsersFilterInterface } from '../interfaces/users-filter.interface';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersInputDto
  extends PaginationDto
  implements UsersFilterInterface
{
  @ApiPropertyOptional({ description: 'Name of the user' })
  name?: string;

  @ApiPropertyOptional({ description: 'Email of the user' })
  email?: string;

  @ApiPropertyOptional({ description: 'Profile of the user' })
  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  @IsOptional()
  @Type(() => Number)
  profile?: ProfileEnum;
}
