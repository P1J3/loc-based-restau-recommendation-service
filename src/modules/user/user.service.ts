import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { exclude } from 'src/helper/exclude';

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

    return exclude(user, ['password']);
  }
}
