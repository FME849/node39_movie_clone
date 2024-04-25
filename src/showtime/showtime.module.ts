import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShowtimeController],
  providers: [ShowtimeService, PrismaService],
})
export class ShowtimeModule {}
