import {
  Controller,
  Get,
  // Param,
  // ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaceQueryDto } from './dto/place.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('place')
@Controller('places')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
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

  @Get()
  @ApiResponse({ status: 200, description: '식당 목록을 조회합니다.' })
  @ApiResponse({
    status: 404,
    description: '맛집 목록을 불러올 수 없습니다.',
  })
  async getPlaceList(@Query() placeQueryDto: PlaceQueryDto) {
    return this.placeService.getPlaceList(placeQueryDto);
  }

  // @Get('/:id')
  // @ApiResponse({ status: 200, description: '맛집 상세정보입니다.' })
  // @ApiResponse({
  //   status: 404,
  //   description: '맛집 상세정보를 불러올 수 없습니다.',
  // })
  // async getPlaceInfo(@Param('id', ParseIntPipe) id: number) {
  //   return this.placeService.getPlaceInfo({ id });
  // }
}
