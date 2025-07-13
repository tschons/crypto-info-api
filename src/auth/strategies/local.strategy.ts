import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../user/interfaces/user-repository.interface';
import { UserEntity } from '../../user/user.entity';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    let userTryingAuthenticate: UserEntity;

    try {
      userTryingAuthenticate =
        await this.userRepository.getUserByEmailAndPassword(email, password);
    } catch (error) {
      throw new UnauthorizedException('The password is incorrect');
    }

    return new AuthenticatedUser(
      userTryingAuthenticate.id,
      userTryingAuthenticate.profile,
    );
  }
}
