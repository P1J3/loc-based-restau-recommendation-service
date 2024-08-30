// src/modules/place/place-cron.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './place.entity';
import { processAndSaveData } from 'src/helper/preprocessing';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PlaceCronService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  @Cron('0 4 * * *') // 매일 자정 4시에 실행
  async fetchAndProcessData() {
    try {
      const startTime = Date.now();

      // DB에서 전체 레코드 수를 조회
      const totalRecords = await this.restaurantRepository.count();
      const batchSize = 1000;
      const tasks = [];

      for (let i = 1; i <= totalRecords; i += batchSize) {
        const batchEnd = Math.min(i + batchSize - 1, totalRecords);
        const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/LOCALDATA_072404/${i}/${batchEnd}/`;

        const task = axios
          .get(apiUrl)
          .then((response) => {
            if (response) {
              const rawData = response.data.LOCALDATA_072404.row;
              return processAndSaveData(rawData, this.restaurantRepository);
            } else {
              console.log(
                `No valid data received from API for range ${i} to ${batchEnd}`,
              );
            }
          })
          .catch((error) => {
            console.error(
              `Failed to fetch data from ${i} to ${batchEnd}:`,
              error.message,
            );
          });

        tasks.push(task);
      }

      await Promise.all(tasks);

      const endTime = Date.now();
      const duration = endTime - startTime;

      return {
        message: 'Data processed successfully',
        duration: `${duration} ms`,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch and process data');
    }
  }
}
