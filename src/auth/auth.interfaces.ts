import { Role } from 'src/decorator/role.decorator';

export interface SignUpParams {
  email: string;
  password: string;
  fullName?: string;
  userName?: string;
  phone?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface AddUserParams extends SignUpParams {
  userType?: Role;
}
