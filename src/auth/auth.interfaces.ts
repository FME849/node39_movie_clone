export interface SignUpParams {
  email: string;
  password: string;
  fullName?: string;
  userName?: string;
  phone?: string;
  userType?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}
