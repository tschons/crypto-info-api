import { UserEntity } from '../user.entity';
import { UsersFilterInterface } from './users-filter.interface';

export interface UserRepositoryInterface {
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(user: UserEntity): Promise<UserEntity>;
  getUsers(usersFilter: UsersFilterInterface): Promise<[UserEntity[], number]>;
  getUserById(userId: string, includePassword: boolean): Promise<UserEntity>;
  getUserByEmail(email: string, includePassword: boolean): Promise<UserEntity>;
  deleteUser(userId: string): Promise<void>;
}
