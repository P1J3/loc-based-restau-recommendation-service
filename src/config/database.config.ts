import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/user.entity';
import { Location } from 'src/modules/location/location.entity';
import { Restaurant } from 'src/modules/place/place.entity';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Location, Restaurant],
  synchronize: true, // 개발 환경에서만 true로 설정 (배포 환경에서는 false)
});
