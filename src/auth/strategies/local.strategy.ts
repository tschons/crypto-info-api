import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUser } from '../../shared/value-objects/authenticated-user';
import { HashServiceInterface } from '../../shared/interfaces/hash-service.interface';
import { UserRepositoryInterface } from '../../user/interfaces/user-repository.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('HashServiceInterface')
    private readonly hashService: HashServiceInterface,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    let userTryingAuthenticate = await this.userRepository.getUserByEmail(
      email,
      true,
    );

    if (
      !(await this.hashService.compareHash(
        password,
        userTryingAuthenticate.password!,
      ))
    )
      throw new UnauthorizedException(new Error('The password is incorrect'));

    return new AuthenticatedUser(
      userTryingAuthenticate.id,
      userTryingAuthenticate.profile,
    );
  }
}
