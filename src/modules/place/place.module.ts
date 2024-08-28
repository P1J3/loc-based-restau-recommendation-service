import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
