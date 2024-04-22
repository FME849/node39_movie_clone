import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  movieName: string;

  @ApiProperty()
  trailer?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  premiereDate: string;

  @ApiProperty({ default: 5 })
  rating?: number;

  @ApiProperty({ default: false })
  isHot?: boolean;

  @ApiProperty({ default: false })
  isShowing?: boolean;

  @ApiProperty({ default: true })
  isComingSoon?: boolean;
}
