import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '리뷰가 성공적으로 생성되었습니다.',
  })
  async createReview(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(req.user.id, createReviewDto);
  }

  @Get('restaurant/:id')
  @ApiResponse({ status: 200, description: '식당의 리뷰 목록을 반환합니다.' })
  async getReviewsByRestaurantId(@Param('id') id: number) {
    return this.reviewService.getReviewsByRestaurantId(id);
  }
}
