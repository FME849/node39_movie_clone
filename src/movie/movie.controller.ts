import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, FileUploadDto, UpdateMovieDto } from './dto/movie.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiHeaders,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from 'src/pipe/sharp.pipe';

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
  @Put('update-movie')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  updateMovie(
    @Query('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieParams: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(movieId, updateMovieParams);
  }

  @Get('banner')
  getBanner() {
    return this.movieService.getBanners();
  }

  @Get('all-movies')
  @ApiQuery({ name: 'movieName', required: false })
  getMovies(@Query('movieName') movieName?: string) {
    return this.movieService.getMovies(movieName);
  }

  @Get('paginated-movies')
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'itemsPerPage', required: true })
  @ApiQuery({ name: 'movieName', required: false })
  getPaginatedMovies(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('movieName') movieName?: string,
  ) {
    return this.movieService.getPaginatedMovies(page, itemsPerPage, movieName);
  }

  @Post('upload-image')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  uploadImage(
    @UploadedFile(SharpPipe) imageName: string,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.movieService.uploadImage(imageName, movieId);
  }
}
