import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpUserDto) {
    return await this.userService.createUser(body);
  }
}
