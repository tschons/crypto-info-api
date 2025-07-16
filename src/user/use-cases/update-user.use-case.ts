import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UpdateUserInputDto } from '../dtos/update-user-input.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { Inject, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';

export class UpdateUserUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  async execute(
    userId: string,
    updateUserInputDto: UpdateUserInputDto,
  ): Promise<UserOutputDto> {
    try {
      const user = await this.userRepository.getUserById(userId, false);

      user.name = updateUserInputDto.name;
      user.profile = updateUserInputDto.profile ?? user.profile;

      return plainToInstance(
        UserOutputDto,
        this.userRepository.updateUser(user),
      );
    } catch (error) {
      this.logger.error(`Error updating user: ${userId}`, error.stack);

      throw error;
    }
  }
}
