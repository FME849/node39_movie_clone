import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { addResponseInfo, handleError, toSnakeCase } from 'src/utils/helper';
import type { movies } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(movie: CreateMovieDto) {
    try {
      const newMovie = {
        ...toSnakeCase<movies>(movie),
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

  async updateMovie(movieId: number, movie: UpdateMovieDto) {
    try {
      const currentMovie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movieId,
        },
      });

      if (!currentMovie) {
        throw new BadRequestException('Invalid movie');
      }

      const newMovie = {
        ...currentMovie,
        ...toSnakeCase<Partial<movies>>(movie),
      };
      return addResponseInfo(newMovie, 'Successfully update movie');
    } catch (error) {
      handleError(error);
    }
  }
}
