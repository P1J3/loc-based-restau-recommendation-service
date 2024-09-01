import { Body, Controller, Post } from '@nestjs/common';
import { LogInUserDto, SignUpUserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpUserDto) {
    return await this.userService.createUser(body);
  }

  @Post('log-in')
  async logIn(@Body() body: LogInUserDto) {
    const user = await this.userService.readUserByEmail({ email: body.email });

    await this.authService.checkUserPassword({ user, password: body.password });

    const token = await this.authService.generateToken({
      userId: user.id,
    });

    return { token };
  }
}
