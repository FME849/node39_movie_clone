import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInParams, SignUpParams, AddUserParams } from './auth.interfaces';
import { ApiTags, ApiBody, ApiHeaders } from '@nestjs/swagger';
import { AddUserDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Role, Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

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

  @ApiHeaders([{ name: 'token', required: true }])
  @ApiBody({ type: AddUserDto })
  @Post('add-user')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  addUser(@Req() req: any, @Body() addUserParams: AddUserParams) {
    return this.authService.handleAddUser(addUserParams);
  }
}
