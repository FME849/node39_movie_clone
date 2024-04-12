import { Injectable } from '@nestjs/common';
import { SignUpParams } from './auth.intefaces';

@Injectable()
export class AuthService {
  handleSignUp(signUpParams: SignUpParams): void {
    console.log(JSON.stringify(signUpParams, null, 2));
    const { email, password, fullName, phone, userName, userType } =
      signUpParams;

    const isAccountExist = await;
  }
}
