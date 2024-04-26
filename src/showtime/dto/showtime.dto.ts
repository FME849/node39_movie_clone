import { ApiProperty } from '@nestjs/swagger';

export class CreateShowtimeDto {
  @ApiProperty()
  theaterId: number;

  @ApiProperty()
  movieId: number;

  @ApiProperty({ format: 'date-time' })
  showtimeDate: string;

  @ApiProperty()
  ticketPrice: number;
}
