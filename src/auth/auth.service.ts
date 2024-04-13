import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpParams } from './auth.intefaces';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
