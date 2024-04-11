import { Injectable } from '@nestjs/common';
import { SignUpParams } from './auth.intefaces';

@Injectable()
export class AuthService {
  signUp(signUpParams: SignUpParams): void {
    console.log(JSON.stringify(signUpParams, null, 2));
    // const {email, passWord, } = signUpParams;
  }
}
