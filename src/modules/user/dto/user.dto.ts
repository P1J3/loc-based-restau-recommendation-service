import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

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
    description: '여/부',
    example: 'true',
  })
  isRecommend: boolean;
}
