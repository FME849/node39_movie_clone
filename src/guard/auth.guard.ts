import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request) {
    const { token } = request.headers;
    if (!token) {
      throw new BadRequestException('Token not found');
    }

    try {
      const payload = this.jwt.verify(token, {
        secret: jwtSecret,
      });
      request['jwtPayload'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
