import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { AllExceptionsFilter } from './utils/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

    cors:true
    
    });

  app.useGlobalFilters(new AllExceptionsFilter()); // Регистрируйте глобально AllExceptionsFilter
  // app.use(LoggerMiddleware);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Severstal')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
