import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/review.dto';
import { Restaurant } from '../place/place.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createReview(
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: BigInt(createReviewDto.restaurantId) },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      userId,
    });

    await this.reviewRepository.save(review);

    await this.updateRestaurantAverage(createReviewDto.restaurantId);

    return review;
  }

  async getReviewsByRestaurantId(restaurantId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { restaurantId },
      order: { createdAt: 'DESC' },
    });
  }

  private async updateRestaurantAverage(restaurantId: string): Promise<void> {
    const reviews = await this.reviewRepository.find({
      where: { restaurantId },
    });
    const average =
      reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length;

    await this.restaurantRepository.update(restaurantId, { average });
  }
}
