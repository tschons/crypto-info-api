import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UpdateUserInputDto } from '../dtos/update-user-input.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { plainToInstance } from 'class-transformer';

export class UpdateUserUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    updateUserInputDto: UpdateUserInputDto,
  ): Promise<UserOutputDto> {
    const user = await this.userRepository.getUserById(userId);

    user.name = updateUserInputDto.name;
    user.profile = updateUserInputDto.profile;

    return plainToInstance(UserOutputDto, this.userRepository.updateUser(user));
  }
}
