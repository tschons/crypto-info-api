import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetUsersInputDto } from '../dtos/get-users.input.dto';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { UserOutputDto } from '../dtos/user-output.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedType } from '../../shared/types/paginated.type';

@Injectable()
export class GetUsersUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  /**
   * Executes the user search flow.
   *
   * @param getUsersInputDto Input data for filtering and pagination
   * @returns PaginatedType<UserOutputDto> with user list and pagination details
   */
  async execute(
    getUsersInputDto: GetUsersInputDto,
  ): Promise<PaginatedType<UserOutputDto>> {
    try {
      const [users, total] =
        await this.userRepository.getUsers(getUsersInputDto);
      return {
        page: getUsersInputDto.page,
        pageSize: getUsersInputDto.pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / getUsersInputDto.pageSize),
        items: plainToInstance(UserOutputDto, users),
      };
    } catch (error) {
      this.logger.error('Error getting users', error.stack);

      throw error;
    }
  }
}
