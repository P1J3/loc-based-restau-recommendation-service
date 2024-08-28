import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: SignUpUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    return true;
  }

  async readUserByEmail({ email }: { email: string }) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    return user;
  }

  async readUserById({ userId }: { userId: number }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    return user;
  }

  async modifyUserByRecommend({
    userId,
    isRecommend,
  }: {
    userId: number;
    isRecommend: boolean;
  }) {
    const isRecommendValue = isRecommend ? 1 : 0;
    await this.readUserById({ userId });

    await this.userRepository.update(
      { id: userId },
      { isRecommend: isRecommendValue },
    );

    return true;
  }

  async modifyUser({
    userId,
    lat,
    lon,
  }: {
    userId: number;
    lat: string;
    lon: string;
  }) {
    await this.readUserById({ userId });

    await this.userRepository.update({ id: userId }, { lat, lon });

    return true;
  }
}
