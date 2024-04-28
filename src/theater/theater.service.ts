import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addResponseInfo, handleError } from 'src/utils/helper';

@Injectable()
export class TheaterService {
  constructor(private prisma: PrismaService) {}

  async getTheaterSystems(systemId?: number) {
    try {
      const selector = {};
      if (systemId) {
        selector['where'] = { system_id: systemId };
      }
      const res = await this.prisma.theater_system.findMany(selector);
      return addResponseInfo(res, 'Successfully get theater systems');
    } catch (error) {
      handleError(error);
    }
  }

  async getTheaterGroups(systemId) {
    try {
      const res = await this.prisma.theater_group.findMany({
        where: {
          system_id: systemId,
        },
        include: {
          theater: true,
        },
      });
      return addResponseInfo(res, 'Successfully get theater groups');
    } catch (error) {
      handleError(error);
    }
  }

  async getShowtimeByMovie(movieId: number) {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movieId,
        },
      });

      if (!movie) {
        throw new BadRequestException('Invalid movie');
      }

      const result = await this.prisma.theater_system.findMany({
        where: {
          theater_group: {
            some: {
              theater: {
                some: {
                  showtime: {
                    some: {
                      movie_id: movie.movie_id,
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          theater_group: {
            where: {
              theater: {
                some: {
                  showtime: {
                    some: {
                      movie_id: movie.movie_id,
                    },
                  },
                },
              },
            },
            include: {
              theater: {
                where: {
                  showtime: {
                    some: {
                      movie_id: movie.movie_id,
                    },
                  },
                },
                include: {
                  showtime: {
                    where: {
                      movie_id: movie.movie_id,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return addResponseInfo(
        {
          theater_system: result,
          ...movie,
        },
        'Successfully get showtime by movie',
      );
    } catch (error) {
      handleError(error);
    }
  }
}
