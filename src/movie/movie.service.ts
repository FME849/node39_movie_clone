import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { addResponseInfo, handleError, toSnakeCase } from 'src/utils/helper';
import type { movies } from '@prisma/client';
import { rmSync } from 'fs';

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
      const result = await this.prisma.movies.update({
        where: {
          movie_id: currentMovie.movie_id,
        },
        data: newMovie,
      });
      return addResponseInfo(result, 'Successfully update movie');
    } catch (error) {
      handleError(error);
    }
  }

  async getBanners() {
    try {
      const res = await this.prisma.banners.findMany();
      return addResponseInfo(res, 'Successfully get banners');
    } catch (error) {
      handleError(error);
    }
  }

  async getMovies(movieName?: string) {
    try {
      let res;
      if (movieName) {
        res = await this.prisma.movies.findMany({
          where: {
            movie_name: {
              contains: movieName,
            },
          },
        });
      } else {
        res = await this.prisma.movies.findMany();
      }
      return addResponseInfo(res, 'Successfully get movies');
    } catch (error) {
      handleError(error);
    }
  }

  async getPaginatedMovies(
    page: number,
    itemsPerPage: number,
    movieName?: string,
  ) {
    try {
      let res;
      const skip = (page - 1) * itemsPerPage;
      if (movieName) {
        res = await this.prisma.movies.findMany({
          where: {
            movie_name: {
              contains: movieName,
            },
          },
          skip,
          take: itemsPerPage,
        });
      } else {
        res = await this.prisma.movies.findMany({
          skip,
          take: itemsPerPage,
        });
      }
      return addResponseInfo(res, 'Successfully get paginated movies');
    } catch (error) {
      handleError(error);
    }
  }

  async uploadImage(imageName: string, movieId: number) {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movieId,
        },
      });

      if (!movie) {
        rmSync(`${process.cwd()}/public/img/${imageName}`);
        throw new BadRequestException('Invalid movie');
      }

      const result = await this.prisma.movies.update({
        where: {
          movie_id: movie.movie_id,
        },
        data: {
          ...movie,
          image: imageName,
        },
      });
      return addResponseInfo(result, 'Successfully upload movie image');
    } catch (error) {
      handleError(error);
    }
  }
}
