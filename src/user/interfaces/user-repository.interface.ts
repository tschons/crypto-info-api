import { UserEntity } from '../user.entity';
import { UsersFilterInterface } from './users-filter.interface';

export interface UserRepositoryInterface {
  createUser(user: UserEntity): Promise<UserEntity>;
  getUsers(usersFilter: UsersFilterInterface): Promise<[UserEntity[], number]>;
}
