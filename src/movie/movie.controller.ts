import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('MovieManagement')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiHeaders([{ name: 'token', required: true }])
  @Post('create-movie')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  createMovie(@Body() createMovieParams: CreateMovieDto) {
    return this.movieService.createMovie(createMovieParams);
  }

  @ApiHeaders([{ name: 'token', required: true }])
  @Post('update-movie')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  updateMovie(
    @Query('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieParams: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(movieId, updateMovieParams);
  }
}
