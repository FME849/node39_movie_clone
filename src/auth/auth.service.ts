import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpParams } from './auth.intefaces';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async handleSignUp(signUpParams: SignUpParams) {
    try {
      const { email, password, fullName, phone, userName, userType } =
        signUpParams;

      const isAccountExist = await this.prisma.users.findFirst({
        where: { email },
      });

      if (isAccountExist) {
        throw new ForbiddenException('Account existed');
      } else {
        const newUser = {
          email,
          pass_word: bcrypt.hashSync(password, 10),
          full_name: fullName,
          phone,
          user_name: userName,
          user_type: userType,
        };
        const newCreateAccount = await this.prisma.users.create({
          data: newUser,
        });

        return newCreateAccount;
      }
    } catch (error) {
      return handleError(error);
    }
  }
}
