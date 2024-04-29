import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  showtimeId: number;

  @ApiProperty({ type: [Number] })
  chairsIds: number[];
}
