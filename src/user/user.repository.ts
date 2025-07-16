import { Injectable, Logger } from '@nestjs/common';
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
    private readonly logger: Logger,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    this.logger.debug(`Creating user: ${JSON.stringify(userEntity)}`);
    const insertResult = await this.insert(userEntity);
    userEntity.id = insertResult.identifiers[0].id;
    return userEntity;
  }

  async updateUser(userEntity: UserEntity): Promise<UserEntity> {
    this.logger.debug(`Updating user: ${JSON.stringify(userEntity)}`);
    return this.save(userEntity);
  }

  async getUserByIdAndPassword(
    userId: string,
    password: string,
  ): Promise<UserEntity> {
    this.logger.debug(`Getting user by id and password: ${userId}`);
    return this.findOneByOrFail({ id: userId, password });
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    this.logger.debug(`Getting user by email and password: ${email}`);
    return this.findOneByOrFail({ email, password });
  }

  async getUsers(
    usersFilter: UsersFilterInterface,
  ): Promise<[UserEntity[], number]> {
    const filter: FindOptionsWhere<UserEntity> = {};

    if (usersFilter.name) filter.name = Like(`%${usersFilter.name}%`);

    if (usersFilter.email) filter.email = Like(`%${usersFilter.email}%`);

    if (usersFilter.profile) filter.profile = usersFilter.profile;

    this.logger.debug(`Getting users: ${JSON.stringify(usersFilter)}`);
    return await this.findAndCount({
      order: { [usersFilter.orderBy]: usersFilter.order },
      skip: (usersFilter.page - 1) * usersFilter.pageSize,
      take: usersFilter.pageSize,
      where: filter,
    });
  }

  async getUserById(userId: string): Promise<UserEntity> {
    this.logger.debug(`Getting user by id: ${userId}`);
    return this.findOneByOrFail({ id: userId });
  }
}
