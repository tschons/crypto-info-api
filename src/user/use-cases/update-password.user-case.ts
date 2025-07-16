import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UpdatePasswordInputDto } from '../dtos/update-password-input.dto';
import { Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { UserEntity } from '../user.entity';
import { ErrorEnum } from '../../shared/enums/error.enum';

export class UpdatePasswordUserCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  async execute(
    userId: string,
    updatePasswordInputDto: UpdatePasswordInputDto,
  ): Promise<void> {
    let user: UserEntity;
    try {
      user = await this.userRepository.getUserByIdAndPassword(
        userId,
        updatePasswordInputDto.currentPassword,
      );
    } catch (error) {
      if (error.name === ErrorEnum.EntityNotFound)
        throw new UnauthorizedException('The password is incorrect');

      this.logger.error(
        `Error updating password from user ${userId}`,
        error.stack,
      );
      throw error;
    }

    user.password = updatePasswordInputDto.newPassword;
    await this.userRepository.updateUser(user);
  }
}
