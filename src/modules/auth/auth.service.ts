import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 비밀번호 비교
  async checkUserPassword({
    user,
    password,
  }: {
    user: User;
    password: string;
  }) {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('PW 오류입니다. 다시 시도해주세요.');
    }

    return isValid;
  }

  // 토큰 생성
  async generateToken({ userId }: { userId?: number }) {
    const payload: Payload = {
      userId,
    };

    return this.jwtService.sign(payload);
  }
}

type Payload = { userId: number };
