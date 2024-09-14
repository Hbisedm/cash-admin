import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './common/fillter/custom-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new CustomExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    origin: '*',
    // allowedHeaders: ['Authorization', 'content-type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/apiJson',
  });

  await app.listen(configService.get('server_port'));
}
bootstrap();
