import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInParams, SignUpParams } from './auth.interfaces';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './auth.dto';

@ApiTags('UserManagement')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignUpDto })
  @Post('sign-up')
  signUp(@Body() signUpParams: SignUpParams) {
    return this.authService.handleSignUp(signUpParams);
  }

  @ApiBody({ type: SignInDto })
  @Post('sign-in')
  signIn(@Body() signInParams: SignInParams) {
    return this.authService.handleSignIn(signInParams);
  }
}
