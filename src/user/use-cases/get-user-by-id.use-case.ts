import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { UserOutputDto } from '../dtos/user-output.dto';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { plainToInstance } from 'class-transformer';

export class GetUserByIdUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<UserOutputDto> {
    return plainToInstance(
      UserOutputDto,
      await this.userRepository.getUserById(userId),
    );
  }
}
