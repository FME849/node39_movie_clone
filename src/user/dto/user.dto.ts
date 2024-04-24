import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.decorator';

export class UserDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  passWord: string;

  @ApiProperty()
  userType: Role;
}

export class UpdateUserDto extends OmitType(PartialType(UserDto), [
  'email',
  'passWord',
  'userType',
]) {}
