import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { Restaurant } from '../place/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Restaurant])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
