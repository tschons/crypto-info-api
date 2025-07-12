import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { CreateUserInputDto } from '../dtos/create-user-input.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserOutputDto } from '../dtos/create-user-output.dto';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../user.entity';

@Injectable()
export class CreateUserUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const userEntity = plainToInstance(UserEntity, createUserInputDto);

    return await this.userRepository.createUser(userEntity);
  }
}
