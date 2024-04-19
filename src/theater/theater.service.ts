import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addResponseInfo, handleError } from 'src/utils/helper';

@Injectable()
export class TheaterService {
  constructor(private prisma: PrismaService) {}

  async getTheaterSystems(theaterId?: number) {
    try {
      const selector = {};
      if (theaterId) {
        selector['where'] = { system_id: theaterId };
      }
      const res = await this.prisma.theater_system.findMany(selector);
      return addResponseInfo(res);
    } catch (error) {
      handleError(error);
    }
  }
}
