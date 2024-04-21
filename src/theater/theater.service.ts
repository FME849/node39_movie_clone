import { Injectable } from '@nestjs/common';
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
      return addResponseInfo(res);
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
      return addResponseInfo(res);
    } catch (error) {
      handleError(error);
    }
  }
}
