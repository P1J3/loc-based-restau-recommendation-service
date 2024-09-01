import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  @ApiProperty({
    description: '이메일 주소',
    example: 'test@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'test1234',
  })
  password: string;
}

export class LogInUserDto {
  @IsEmail()
  @ApiProperty({
    description: '이메일 주소',
    example: 'test@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'test1234',
  })
  password: string;
}

export class IsRecommendDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: '점심 추천 여/부',
    example: 'true',
  })
  isRecommend: boolean;
}

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '위도',
    example: '137.123123',
  })
  lat: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '경도',
    example: '37.123123',
  })
  lon: string;
}
