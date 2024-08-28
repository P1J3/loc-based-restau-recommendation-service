import { Controller, Get } from '@nestjs/common';
import { PlaceService } from './place.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('location')
  @ApiResponse({ status: 200, description: '시군구 목록을 조회합니다.' })
  @ApiResponse({
    status: 404,
    description: '시군구 데이터를 조회할 수 없습니다.',
  })
  async getLocationList() {
    return this.placeService.findAll();
  }
}
