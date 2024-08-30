import { Repository } from 'typeorm';
import { Restaurant } from '../modules/place/place.entity';
import {
  convertCoordinates,
  formatDateTimeString,
  formatDateString,
} from './utils';

export async function processAndSaveData(
  rawData: any[],
  restaurantRepository: Repository<Restaurant>,
) {
  for (const item of rawData) {
    // 필터링 조건: 폐업일이 존재하거나 필수 데이터가 없는 경우
    if (item.DCBYMD || !item.X || !item.Y || !item.BPLCNM || !item.LASTMODTS) {
      continue;
    }

    // 하이픈 제거 및 정수형으로 변환
    const sanitizedId = BigInt(item.MGTNO.replace(/-/g, ''));

    // 기존 레스토랑 엔티티를 ID로 조회
    const existingRestaurant = await restaurantRepository.findOne({
      where: { id: sanitizedId },
    });

    const updatedAt = formatDateTimeString(item.LASTMODTS);

    if (existingRestaurant) {
      // existingRestaurant.updatedAt와 item.LASTMODTS 비교
      if (existingRestaurant.updatedAt.getTime() !== updatedAt.getTime()) {
        // updatedAt이 다를 경우에만 전처리 수행 및 업데이트

        // 좌표 변환
        const { lat, lon } = convertCoordinates(
          parseFloat(item.X),
          parseFloat(item.Y),
        );

        // 날짜 형식 변환
        const createdAt = formatDateString(item.APVPERMYMD);

        // 필드 갱신
        existingRestaurant.name = item.BPLCNM;
        existingRestaurant.type = item.UPTAENM;
        existingRestaurant.lat = lat.toString();
        existingRestaurant.lon = lon.toString();
        existingRestaurant.address = item.SITEWHLADDR;
        existingRestaurant.createdAt = createdAt;
        existingRestaurant.updatedAt = updatedAt;

        // 업데이트된 레코드를 데이터베이스에 저장
        await restaurantRepository.save(existingRestaurant);
      }
    } else {
      // 레코드가 존재하지 않으면 새로 생성하여 저장

      // 좌표 변환
      const { lat, lon } = convertCoordinates(
        parseFloat(item.X),
        parseFloat(item.Y),
      );

      // 날짜 형식 변환
      const createdAt = formatDateString(item.APVPERMYMD);

      const restaurant = new Restaurant();
      restaurant.id = sanitizedId;
      restaurant.name = item.BPLCNM;
      restaurant.type = item.UPTAENM;
      restaurant.lat = lat.toString();
      restaurant.lon = lon.toString();
      restaurant.address = item.SITEWHLADDR;
      restaurant.createdAt = createdAt;
      restaurant.updatedAt = updatedAt;

      await restaurantRepository.save(restaurant);
    }
  }
}
