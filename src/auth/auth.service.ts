import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddUserParams, SignInParams, SignUpParams } from './auth.interfaces';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { addResponseInfo, exclude, handleError } from 'src/utils/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async handleSignUp(signUpParams: SignUpParams) {
    try {
      const { email, password, fullName, phone, userName } = signUpParams;

      const isAccountExist = await this.prisma.users.findFirst({
        where: { email },
      });

      if (isAccountExist) {
        throw new BadRequestException('Account existed');
      } else {
        const newUser = {
          email,
          pass_word: bcrypt.hashSync(password, 10),
          full_name: fullName,
          phone,
          user_name: userName,
        };
        const newCreateAccount = await this.prisma.users.create({
          data: newUser,
        });

        return addResponseInfo(
          newCreateAccount,
          'Successfully sign-up new account',
        );
      }
    } catch (error) {
      return handleError(error);
    }
  }

  async handleSignIn(signInParams: SignInParams) {
    try {
      const { email, password } = signInParams;
      const account = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (!account) {
        throw new BadRequestException('Email not found');
      } else {
        if (!bcrypt.compareSync(password, account.pass_word)) {
          throw new UnauthorizedException('Password incorrect');
        } else {
          const payload = {
            userId: account.user_id,
            email: account.email,
            userType: account.user_type,
          };
          const accessToken = await this.jwt.signAsync(payload);
          const accountWithoutPassword = exclude(account, ['pass_word']);
          return addResponseInfo(
            {
              accessToken,
              account: accountWithoutPassword,
            },
            'Successfully sign-in',
          );
        }
      }
    } catch (error) {
      return handleError(error);
    }
  }

  async handleAddUser(addUserParams: AddUserParams) {
    try {
      const { email, password, fullName, phone, userName, userType } =
        addUserParams;

      const isAccountExist = await this.prisma.users.findFirst({
        where: { email },
      });

      if (isAccountExist) {
        throw new BadRequestException('Account existed');
      } else {
        const newUser = {
          email,
          pass_word: bcrypt.hashSync(password, 10),
          full_name: fullName,
          phone,
          user_name: userName,
          user_type: userType.toUpperCase(),
        };
        const newCreateAccount = await this.prisma.users.create({
          data: newUser,
        });

        return addResponseInfo(
          newCreateAccount,
          `Successfully add new ${userType} account`,
        );
      }
    } catch (error) {
      return handleError(error);
    }
  }
}
