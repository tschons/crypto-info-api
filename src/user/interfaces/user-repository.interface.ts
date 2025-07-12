import { UserEntity } from '../user.entity';

export interface UserRepositoryInterface {
  createUser(user: UserEntity): Promise<UserEntity>;
}
