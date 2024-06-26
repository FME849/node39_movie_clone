import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { addResponseInfo, handleError, toSnakeCase } from 'src/utils/helper';
import { CreateShowtimeDto } from './dto/showtime.dto';
import { book_ticket } from '@prisma/client';
import { CreateTicketDto } from './dto/ticket.dto';

@ApiTags('ShowtimeManagement')
@Injectable()
export class ShowtimeService {
  constructor(private prisma: PrismaService) {}

  async createShowtime(createShowtimeParams: CreateShowtimeDto) {
    try {
      const { theaterId, movieId, ticketPrice } = createShowtimeParams;
      const theater = await this.prisma.theater.findUnique({
        where: {
          theater_id: theaterId,
        },
      });

      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movieId,
        },
      });

      if (!theater || !movie) {
        throw new BadRequestException('Theater or movie is invalid');
      }

      if (!(ticketPrice > 0)) {
        throw new BadRequestException('Ticket price must be higher than 0');
      }
      createShowtimeParams.showtimeDate.slice(0, 19).replace('T', ' ');
      const newShowtime = toSnakeCase(createShowtimeParams);
      const result = await this.prisma.showtime.create({
        data: newShowtime,
        include: {
          movies: true,
          theater: {
            include: {
              theater_group: true,
            },
          },
        },
      });
      return addResponseInfo(result, 'Successfully create showtime');
    } catch (error) {
      handleError(error);
    }
  }

  async getShowtime(showtimeId: number) {
    try {
      const showtimeBookedTicket = await this.prisma.book_ticket.findMany({
        where: {
          showtime_id: showtimeId,
        },
      });

      const showtime = await this.prisma.showtime.findUnique({
        where: {
          showtime_id: showtimeId,
        },
        include: {
          theater: {
            include: {
              chairs: true,
            },
          },
        },
      });

      showtime.theater.chairs.forEach((chair) => {
        chair['ticket_price'] =
          chair.chair_type === 'VIP'
            ? showtime.ticket_price * 2
            : showtime.ticket_price;

        const isBooked = showtimeBookedTicket.some(
          (ticket) => ticket.chair_id === chair.chair_id,
        );
        chair['is_booked'] = isBooked;
      });
      return addResponseInfo(showtime, 'Successfully get showtime');
    } catch (error) {
      handleError(error);
    }
  }

  async bookTicket(createTicketParams: CreateTicketDto) {
    try {
      const { userId, showtimeId, chairsIds } = createTicketParams;
      const user = await this.prisma.users.findUnique({
        where: {
          user_id: userId,
        },
      });
      const showtime = await this.prisma.showtime.findUnique({
        where: {
          showtime_id: showtimeId,
        },
      });
      const chairValidation = (
        await Promise.all(
          chairsIds.map((chairId) =>
            this.prisma.chairs.findUnique({
              where: {
                chair_id: chairId,
              },
            }),
          ),
        )
      ).filter((chair) => !chair);

      if (!user || !showtime || chairValidation.length > 0) {
        throw new BadRequestException('Invalid user, showtime or chairs');
      }
      const newTickets = chairsIds.map((chairId) =>
        toSnakeCase<book_ticket>({
          userId,
          showtimeId,
          chairId,
        }),
      );
      const result = await this.prisma.book_ticket.createMany({
        data: newTickets,
      });
      return addResponseInfo(result, 'Successfully create tickets');
    } catch (error) {
      handleError(error);
    }
  }
}
