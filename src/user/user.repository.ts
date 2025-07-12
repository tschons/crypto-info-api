import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const insertResult = await this.insert(userEntity);
    userEntity.id = insertResult.identifiers[0].id;
    return userEntity;
  }
}
