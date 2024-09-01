import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './place.entity';
import { Location } from '../location/location.entity';
import { PlaceCronService } from './placeCron.service';
import { Review } from '../review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Location, Review])],
  providers: [PlaceService, PlaceCronService],
  controllers: [PlaceController],
})
export class PlaceModule {}
