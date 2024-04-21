import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('TheaterManagement')
@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @ApiQuery({ name: 'systemId', required: false, type: Number })
  @Get('theater-system')
  getTheaterSystems(
    @Query('systemId', new ParseIntPipe({ optional: true }))
    systemId?: number,
  ) {
    return this.theaterService.getTheaterSystems(systemId);
  }

  @ApiQuery({ name: 'systemId', required: true, type: Number })
  @Get('theater-group')
  getTheaterGroup(@Query('systemId', ParseIntPipe) systemId: number) {
    return this.theaterService.getTheaterGroups(systemId);
  }
}
