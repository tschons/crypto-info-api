import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileEnum } from '../enums/profile.enum';
import { PROFILE_KEY } from '../decorators/profile.decorator';
import { AccessTokenPayload } from '../value-objects/access-token-payload';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredProfile = this.reflector.getAllAndOverride<ProfileEnum>(
      PROFILE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredProfile) return true;

    const accessTokenPayload = context.switchToHttp().getRequest()
      .user as AccessTokenPayload;
    return requiredProfile === accessTokenPayload.role;
  }
}
