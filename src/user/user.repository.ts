import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersFilterInterface } from './interfaces/users-filter.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

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

  async getUsers(
    usersFilter: UsersFilterInterface,
  ): Promise<[UserEntity[], number]> {
    const filter: FindOptionsWhere<UserEntity> = {};

    if (usersFilter.name) filter.name = Like(`%${usersFilter.name}%`);

    if (usersFilter.email) filter.email = Like(`%${usersFilter.email}%`);

    if (usersFilter.profile) filter.profile = usersFilter.profile;

    return await this.findAndCount({
      order: { [usersFilter.orderBy]: usersFilter.order },
      skip: (usersFilter.page - 1) * usersFilter.pageSize,
      take: usersFilter.pageSize,
      where: filter,
    });
  }
}
