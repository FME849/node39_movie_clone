import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateShowtimeDto } from './dto/showtime.dto';
import { CreateTicketDto } from './dto/ticket.dto';

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

  @Get('get-showtime')
  getShowtime(@Query('showtimeId', ParseIntPipe) showtimeId: number) {
    return this.showtimeService.getShowtime(showtimeId);
  }

  // @ApiHeaders([{ name: 'token', required: true }])
  @Post('create-tickets')
  // @UseGuards(AuthGuard)
  createTicket(@Body() createTicketParams: CreateTicketDto) {
    return this.showtimeService.bookTicket(createTicketParams);
  }
}
