import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlaceQueryDto {
  @IsString()
  @ApiProperty({
    description: '위도',
    example: '37.56100278',
    required: true,
  })
  lat?: string;

  @IsString()
  @ApiProperty({
    description: '경도',
    example: '126.9996417',
    required: true,
  })
  lon?: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: '범위(km)',
    example: 5.0,
    required: true,
  })
  range?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '정렬 기준',
    example: '평점순',
    required: true,
  })
  sort?: string = '거리순';
}
