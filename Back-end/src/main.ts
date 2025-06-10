// Back-end/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importar
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
      transform: true, // Transforma o payload para o tipo do DTO (útil para tipos primitivos)
      // disableErrorMessages: true, // Em produção, pode-se desabilitar mensagens de erro detalhadas
    }),
  );

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  app.enableCors(); // Habilita CORS para permitir requisições do front-end
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();