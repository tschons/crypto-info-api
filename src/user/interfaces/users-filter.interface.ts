import { ProfileEnum } from '../../shared/enums/profile.enum';
import { PaginationInterface } from '../../shared/interfaces/pagination.interface';

export interface UsersFilterInterface extends PaginationInterface {
  name?: string;
  email?: string;
  profile?: ProfileEnum;
}
