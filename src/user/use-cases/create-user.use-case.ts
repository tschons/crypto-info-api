import { UseCaseInterface } from '../../shared/interfaces/use-case.interface';
import { CreateUserInputDto } from '../dtos/create-user-input.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserOutputDto } from '../dtos/user-output.dto';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../user.entity';
import { DuplicateKeyException } from '../../shared/exceptions/duplicate-key.exception';
import { ErrorEnum } from '../../shared/enums/error.enum';

@Injectable()
export class CreateUserUseCase implements UseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: Logger,
  ) {}

  async execute(
    createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    try {
      let userEntity = plainToInstance(UserEntity, createUserInputDto);
      userEntity = await this.userRepository.createUser(userEntity);
      return plainToInstance(UserOutputDto, userEntity);
    } catch (error) {
      if (
        error.name === ErrorEnum.QueryFailed &&
        error.code === 'ER_DUP_ENTRY'
      ) {
        throw new DuplicateKeyException('Email already in use');
      }

      this.logger.error(
        `Error creating user: ${createUserInputDto.email}`,
        error.stack,
      );

      throw error;
    }
  }
}
