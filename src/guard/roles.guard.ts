import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY, Role } from 'src/decorator/role.decorator';
import { jwtSecret } from 'src/utils/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) {
      return true;
    }

    const { token } = context.switchToHttp().getRequest().headers;
    const { userType } = this.jwt.verify(token, {
      secret: jwtSecret,
    });

    return requiredRoles.some((role) => userType.toUpperCase() === role);
  }
}
