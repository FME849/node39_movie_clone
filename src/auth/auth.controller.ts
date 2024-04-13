import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpParams } from './auth.intefaces';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { SignUpDto } from './auth.dto';

@ApiTags('UserManagement')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignUpDto })
  @Post('sign-up')
  signUp(@Body() signUpParams: SignUpParams) {
    return this.authService.handleSignUp(signUpParams);
  }

  @Post('sign-in')
  signIn(): void {}
}
