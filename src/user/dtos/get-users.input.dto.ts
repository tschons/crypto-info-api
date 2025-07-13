import { ProfileEnum } from '../../shared/enums/profile.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { UsersFilterInterface } from '../interfaces/users-filter.interface';
import { Type } from 'class-transformer';

export class GetUsersInputDto
  extends PaginationDto
  implements UsersFilterInterface
{
  name?: string;

  email?: string;

  @IsOptional()
  @IsEnum(ProfileEnum, { message: 'Invalid profile' })
  @Type(() => Number)
  profile?: ProfileEnum;
}
