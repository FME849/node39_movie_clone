import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpParams } from './auth.intefaces';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() signUpParams: SignUpParams): string {
    this.authService.signUp(signUpParams);

    return 'signUp';
  }

  @Post('sign-in')
  signIn(): void {}
}
