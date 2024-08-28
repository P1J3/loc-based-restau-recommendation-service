import { Injectable } from '@nestjs/common';
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
}
