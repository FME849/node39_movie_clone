import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateShowtimeDto } from './dto/showtime.dto';

@ApiTags('ShowtimeManagement')
@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @ApiHeaders([{ name: 'token', required: true }])
  @Post('create-showtime')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  createShowtime(@Body() createShowtimeParams: CreateShowtimeDto) {
    return this.showtimeService.createShowtime(createShowtimeParams);
  }
}
