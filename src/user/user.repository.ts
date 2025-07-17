import { Inject, Injectable, Logger } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersFilterInterface } from './interfaces/users-filter.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { HashServiceInterface } from '../shared/interfaces/hash-service.interface';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
    private readonly logger: Logger,
    @Inject('HashServiceInterface')
    private readonly hashService: HashServiceInterface,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    userEntity.password = await this.hashService.generateHash(
      userEntity.password!,
    );

    this.logger.debug(`Creating user: ${JSON.stringify(userEntity)}`);
    const insertResult = await this.insert(userEntity);
    userEntity.id = insertResult.identifiers[0].id;

    delete userEntity.password;
    return userEntity;
  }

  async updateUser(userEntity: UserEntity): Promise<UserEntity> {
    if (userEntity.password)
      userEntity.password = await this.hashService.generateHash(
        userEntity.password,
      );

    this.logger.debug(`Updating user: ${JSON.stringify(userEntity)}`);
    return this.save(userEntity);
  }

  async getUserById(
    userId: string,
    includePassword: boolean = false,
  ): Promise<UserEntity> {
    this.logger.debug(`Getting user by id and password: ${userId}`);

    if (includePassword) {
      return this.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id: userId })
        .getOneOrFail();
    }

    return this.findOneByOrFail({ id: userId });
  }

  async getUserByEmail(
    email: string,
    includePassword: boolean = false,
  ): Promise<UserEntity> {
    this.logger.debug(`Getting user by email and password: ${email}`);

    if (includePassword) {
      return this.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email })
        .getOneOrFail();
    }

    return this.findOneByOrFail({ email });
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

  async deleteUser(userId: string): Promise<void> {
    this.logger.debug(`Deleting user: ${userId}`);
    await this.softDelete(userId);
  }
}
