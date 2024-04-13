import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  userType: string;
}
