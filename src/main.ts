import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ссылка на конфиг service
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const config = new DocumentBuilder()
    .setTitle('Education API')
    .setVersion('1.0')
    .addBearerAuth()
    .build(); // Конфигурируем сборщик документации
  const document = SwaggerModule.createDocument(app, config); // создаем апи документацию
  SwaggerModule.setup('api_docs', app, document); //включаем документацию Swagger по пути localhost:3001/api_docs
  await app.listen(port); //устанавливаем порт прослушивания 3001
  await app.setGlobalPrefix('/api'); //глобальный префикс для роутов контроллера
}
bootstrap();
