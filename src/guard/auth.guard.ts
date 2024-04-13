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

  private async validateRequest(request: any) {
    if (!request.headers) {
      return false;
    }
    const { token } = request.headers;

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: jwtSecret,
      });
      request['jwtPayload'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
