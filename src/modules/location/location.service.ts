import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class LocationService implements OnModuleInit {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  // 서버 실행 시 자동으로 실행될 메서드
  async onModuleInit() {
    const filePath = `${process.cwd()}/docs/sgg_lat_lon.xlsx`; // 파일 경로 지정

    // 시군구 데이터가 없는 경우, XLSX 파일을 읽어들이는 메서드 실행
    const count = await this.locationRepository.count();
    if (count === 0) {
      await this.readFile(filePath);
    }
  }

  // 시군구 데이터 파일 내용 읽어서 DB에 삽입
  async readFile(filePath: string) {
    try {
      // 1. XLSX 파일을 읽어 들임
      const workbook = XLSX.readFile(filePath);

      // 2. 첫 번째 시트를 선택
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // 3. 시트의 데이터를 JSON 형식으로 변환
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: ['do-si', 'sgg', 'lat', 'lon'], // 수동으로 헤더 지정
        range: 1, // 첫 번째 행을 건너뛰고 데이터로 처리
      });
      // jsonData 예시
      // [
      //   { "do-si": "서울특별시", "sgg": "강남구", "lat": "37.5172", "lon": "127.0473" },
      //   { "do-si": "부산광역시", "sgg": "해운대구", "lat": "35.1631", "lon": "129.1634" }
      // ]
      //console.log('jsonData: ', jsonData);

      // 4. 변환된 데이터를 DB에 삽입
      for (const data of jsonData) {
        //console.log('data: ', data);
        const location = new Location();

        // 데이터 매핑
        location.doSi = data['do-si'] || '';
        location.sgg = data['sgg'] || ''; // 예: 'Sgg'는 엑셀의 컬럼 이름
        location.lat = data['lat'] || ''; // 예: 'Lat'는 엑셀의 컬럼 이름
        location.lon = data['lon'] || ''; // 예: 'Lon'는 엑셀의 컬럼 이름

        // 각 엔티티를 DB에 저장
        await this.locationRepository.save(location);
      }
      console.log('시군구 데이터가 DB에 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('시군구 데이터 처리 중 에러 발생: ', error);
    }
  }
}
