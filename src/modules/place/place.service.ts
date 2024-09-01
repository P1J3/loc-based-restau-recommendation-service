import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './place.entity';
import { Repository } from 'typeorm';
import { Location } from '../location/location.entity';
import { PlaceQueryDto } from './dto/place.dto';
import { Review } from '../review/review.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
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
    const deltaLat = (range / R) * (180 / Math.PI);
    const minLat = centerLat - deltaLat;
    const maxLat = centerLat + deltaLat;

    // 경도의 변화량 계산 (위도에 따른 보정 적용)
    const cosLat = Math.cos((centerLat * Math.PI) / 180);
    const deltaLon = (range / (R * cosLat)) * (180 / Math.PI);
    const minLon = centerLon - deltaLon;
    const maxLon = centerLon + deltaLon;
    console.log(minLat, maxLat, minLon, maxLon);

    //2. BoundingBox(1차)와 GIS(2차) 활용해서 거리 반경 내 데이터 필터링
    let query = `
      SELECT *
      FROM restaurant
      WHERE
        CAST(lat AS DOUBLE) BETWEEN ${minLat} AND ${maxLat}
        AND CAST(lon AS DOUBLE) BETWEEN ${minLon} AND ${maxLon}
        AND ST_Distance_Sphere(
              point(${centerLon}, ${centerLat}),
              point(CAST(lon AS DOUBLE), CAST(lat AS DOUBLE))
            ) <= ${range * 1000}
    `;

    if (sort === '거리순') {
      query += `
        ORDER BY ST_Distance_Sphere(
                  point(${centerLon}, ${centerLat}),
                  point(CAST(lon AS DOUBLE), CAST(lat AS DOUBLE))
                ) ASC
      `;
    } else if (sort === '평점순') {
      query += ` ORDER BY average DESC`;
    }
    console.log('Query:', query);

    const placeList = await this.restaurantRepository.query(query);

    // 데이터가 없는 경우 예외처리
    if (placeList.length === 0) {
      throw new NotFoundException('맛집 목록을 불러올 수 없습니다.');
    }

    return placeList;
  }

  async getPlaceInfo({ id }: { id: number }) {
    const place = await this.restaurantRepository.findOne({
      where: { id: BigInt(id) },
    });

    const reviews = await this.reviewRepository.find({
      where: { restaurantId: id },
      order: { createdAt: 'DESC' },
    });

    if (!place) {
      throw new BadRequestException('맛집 상세정보를 불러올 수 없습니다.');
    }
    const placeInfo = {
      ...place,
      reviews: reviews,
    };
    return placeInfo;
  }
}
