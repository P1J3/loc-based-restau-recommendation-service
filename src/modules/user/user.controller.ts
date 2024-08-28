import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { exclude } from 'src/helper/exclude';
import { IsRecommendDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  async getMyProfile(@Request() req) {
    return exclude(req.user, ['password']);
  }

  @Patch('/isRecommend')
  async patchUserIsRecommend(@Request() req, @Body() body: IsRecommendDto) {
    return await this.userService.modifyUser({
      userId: req.user.id,
      isRecommend: body.isRecommend,
    });
  }
}
