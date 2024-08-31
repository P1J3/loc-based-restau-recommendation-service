import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @ApiProperty({
    description: '리뷰 대상 식당 ID',
    example: 1,
  })
  id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: '평점 (1-5)',
    example: 4,
  })
  score: number;

  @IsString()
  @ApiProperty({
    description: '리뷰 내용',
    example: '맛있는 식당이에요!',
  })
  description: string;
}
