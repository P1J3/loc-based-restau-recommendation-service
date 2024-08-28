import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Restaurant } from './place.entity';
import { Repository } from 'typeorm';
import { Location } from '../location/location.entity';

@Injectable()
export class PlaceService {
  constructor(
    //   @InjectRepository(Restaurant)
    //   private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  async findAll() {
    const data = await this.locationRepository.find();
    //console.log('data: ', data);

    // 데이터(객체) 키 값 변환, 타임스탬프 값 제거
    return data.map((data) => ({
      id: data.id,
      '시,도': data.doSi,
      시군구: data.sgg,
      위도: data.lat,
      경도: data.lon,
    }));
  }
}
