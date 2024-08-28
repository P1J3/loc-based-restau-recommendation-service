import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { exclude } from 'src/helper/exclude';

@ApiTags('users')
@Controller('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  async getMyProfile(@Request() req) {
    return exclude(req.user, ['password']);
  }
}
