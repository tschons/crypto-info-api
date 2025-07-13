import { Min, Max, IsIn, IsInt } from 'class-validator';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { Type } from 'class-transformer';

export class PaginationDto implements PaginationInterface {
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page size must be greater than 0' })
  @Type(() => Number)
  page: number = 1;

  @Min(1, { message: 'Page size must be greater than 0' })
  @Max(100, { message: 'Page size must be less than 100' })
  @Type(() => Number)
  pageSize: number = 10;

  orderBy: string = 'id';

  @IsIn(['asc', 'desc'], { message: 'Order must be asc or desc' })
  order: 'asc' | 'desc' = 'asc';
}
