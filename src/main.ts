import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 들어오면 예외 발생
      transform: true, // 요청 데이터를 자동으로 DTO 인스턴스로 변환
    }),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('P1J3 API')
    .setDescription('API documentation for loc-baced-restaurant service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        name: 'JWT',
      },
      'access-token',
    )
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 스웨거 문서 정렬(글자순, method 순서대로)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
