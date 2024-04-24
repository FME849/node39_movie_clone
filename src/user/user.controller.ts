import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { ApiHeaders, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('UserManagement')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiHeaders([{ name: 'token', required: true }])
  @Get('all')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'itemsPerPage', type: 'number' })
  @ApiHeaders([{ name: 'token', required: true }])
  @Get('pagination')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  findWithPagination(
    @Query('page', ParseIntPipe) page,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage,
  ) {
    return this.userService.getPaginatedUsers(page, itemsPerPage);
  }

  @ApiParam({ name: 'userId', type: 'number' })
  @ApiHeaders([{ name: 'token', required: true }])
  @Get('get-user')
  @UseGuards(AuthGuard)
  findUserById(@Param('userId', ParseIntPipe) userId: number, @Req() req) {
    const { jwtPayload: payload } = req;
    return this.userService.getUserById(userId, payload);
  }

  @ApiHeaders([{ name: 'token', required: true }])
  @Put('update-user')
  @UseGuards(AuthGuard)
  updateUserInfo(@Req() req, @Body() updateUserParams: UpdateUserDto) {
    const { jwtPayload: payload } = req;
    return this.userService.updateUserInfo(payload, updateUserParams);
  }
}
