import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UpdatePasswordInputDto } from '../dtos/update-password-input.dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { UserEntity } from '../user.entity';

export class UpdatePasswordUserCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
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
      throw new UnauthorizedException('The password is incorrect');
    }

    user.password = updatePasswordInputDto.newPassword;
    await this.userRepository.updateUser(user);
  }
}
