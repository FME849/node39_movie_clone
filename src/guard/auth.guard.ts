import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtSecret } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request) {
    const { token } = request.headers;
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: jwtSecret,
      });
      request['jwtPayload'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
