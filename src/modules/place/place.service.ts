import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './place.entity';
import { Repository } from 'typeorm';
import { Location } from '../location/location.entity';
import { PlaceQueryDto } from './dto/place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async findAll() {
    const data = await this.locationRepository.find();

    // 데이터가 없는 경우 예외처리
    if (data.length === 0) {
      throw new NotFoundException('시군구 데이터를 조회할 수 없습니다.');
    }

    // 데이터(객체) 키 값 변환, 타임스탬프 값 제거
    return data.map((data) => ({
      id: data.id,
      '시,도': data.doSi,
      시군구: data.sgg,
      위도: data.lat,
      경도: data.lon,
    }));
  }

  async getPlaceList(placeQueryDto: PlaceQueryDto) {
    const { lat, lon, range, sort = '거리순' } = placeQueryDto;

    // 1. 대략적인 Bounding box 설정
    const R = 6371; // 지구 반경 (단위: km)
    const centerLat: number = +lat;
    const centerLon: number = +lon;

    // 위도의 변화량 계산
    const deltaLat = range / R;
    const minLat = centerLat - deltaLat * (180 / Math.PI);
    const maxLat = centerLat + deltaLat * (180 / Math.PI);

    // 경도의 변화량 계산 (위도에 따른 보정 적용)
    const deltaLon = range / (R * Math.cos((centerLat * Math.PI) / 180));
    const minLon = centerLon - deltaLon * (180 / Math.PI);
    const maxLon = centerLon + deltaLon * (180 / Math.PI);

    //2. BoundingBox(1차)와 GIS(2차) 활용해서 거리 반경 내 데이터 필터링
    const queryBuilder = this.restaurantRepository
      .createQueryBuilder('restaurant')
      .where('CAST(restaurant.lat AS DOUBLE) BETWEEN :minLat AND :maxLat', {
        minLat,
        maxLat,
      })
      .andWhere('CAST(restaurant.lon AS DOUBLE) BETWEEN :minLon AND :maxLon', {
        minLon,
        maxLon,
      })
      .andWhere(
        `
        ST_Distance_Sphere(
          point(:longitude, :latitude),
          point(CAST(restaurant.lon AS DOUBLE), CAST(restaurant.lat AS DOUBLE))
        ) <= :radius`,
        { longitude: centerLon, latitude: centerLat, radius: range * 1000 },
      );

    if (sort === '거리순') {
      queryBuilder.orderBy(
        `
          ST_Distance_Sphere(
            point(:longitude, :latitude),
            point(CAST(restaurant.lon AS DOUBLE), CAST(restaurant.lat AS DOUBLE))
          )`,
        'ASC',
      );
    } else if (sort === '평점순') {
      queryBuilder.orderBy('restaurant.average', 'DESC');
    }

    const placeList = await queryBuilder.getMany();

    // 데이터가 없는 경우 예외처리
    if (placeList.length === 0) {
      throw new NotFoundException('맛집 목록을 불러올 수 없습니다.');
    }
    return placeList;
  }
}
