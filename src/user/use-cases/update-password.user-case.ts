import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UpdatePasswordInputDto } from '../dtos/update-password-input.dto';
import { Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { HashServiceInterface } from '../../shared/interfaces/hash-service.interface';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';

export class UpdatePasswordUserCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
    @Inject('HashServiceInterface')
    private readonly hashService: HashServiceInterface,
  ) {}

  /**
   * Executes the password update flow.
   *
   * @param userId The unique identifier of the user
   * @param updatePasswordInputDto DTO containing the current and new password
   * @returns A promise void
   * @throws {UnauthorizedException} When the current password is incorrect
   */
  async execute(
    userId: string,
    updatePasswordInputDto: UpdatePasswordInputDto,
  ): Promise<void> {
    let user = await this.userRepository.getUserById(userId, true);

    if (
      !(await this.hashService.compareHash(
        updatePasswordInputDto.currentPassword,
        user.password!,
      ))
    ) {
      throw new UnauthorizedException('The password is incorrect');
    }

    user.password = updatePasswordInputDto.newPassword;

    try {
      await this.userRepository.updateUser(user);
    } catch (error) {
      this.logger.error(
        `Error updating password from user ${userId}`,
        error.stack,
      );
      throw error;
    }
  }
}
