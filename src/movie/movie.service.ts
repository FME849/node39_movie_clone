import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { addResponseInfo, handleError } from 'src/utils/helper';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(movie: CreateMovieDto) {
    try {
      const newMovie = {
        movie_name: movie.movieName,
        description: movie.description,
        trailer: movie.trailer,
        premiere_date: new Date(movie.premiereDate).toISOString(),
        rating: movie.rating || 5,
        is_hot: movie.isHot || false,
        is_showing: movie.isShowing || false,
        is_coming_soon: movie.isComingSoon || true,
      };
      const res = await this.prisma.movies.create({
        data: newMovie,
      });
      return addResponseInfo(res, 'Successfully create new movie');
    } catch (error) {
      handleError(error);
    }
  }
}
