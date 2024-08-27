import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
