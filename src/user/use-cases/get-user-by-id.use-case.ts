import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UserOutputDto } from '../dtos/user-output.dto';
import { Inject, Logger } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { plainToInstance } from 'class-transformer';
import { ErrorEnum } from '../../shared/enums/error.enum';

export class GetUserByIdUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  /**
   * Executes the user retrieval flow.
   *
   * @param userId The unique identifier of the user to be retrieved
   * @returns The output DTO of the user
   */
  async execute(userId: string): Promise<UserOutputDto> {
    try {
      return plainToInstance(
        UserOutputDto,
        await this.userRepository.getUserById(userId, false),
      );
    } catch (error) {
      if (error.name !== ErrorEnum.EntityNotFound)
        this.logger.error(`Error getting user by id: ${userId}`, error.stack);

      throw error;
    }
  }
}
