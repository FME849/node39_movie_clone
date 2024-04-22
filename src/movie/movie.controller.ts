import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
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
}
