import { Inject, Logger } from '@nestjs/common';
import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { ErrorEnum } from '../../shared/enums/error.enum';

export class DeleteUserUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  execute(userId: string): Promise<void> {
    try {
      return this.userRepository.deleteUser(userId);
    } catch (error) {
      if (error.name !== ErrorEnum.EntityNotFound)
        this.logger.error(`Error deleting user: ${userId}`, error.stack);

      throw error;
    }
  }
}
