import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.decorator';

export class SignUpDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  userName?: string;
}

export class SignInDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class AddUserDto extends SignUpDto {
  @ApiProperty({ enum: ['Admin', 'User'], enumName: 'userType' })
  userType: Role;
}
