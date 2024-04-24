import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './shared/filter/globalException.filter';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.setGlobalPrefix('/api');
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('NestJs Template')
        .setDescription('Описание методов API.')
        .addBearerAuth()
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });

    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());

    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    await app.listen(port || 3001);
    process.stdout.write(`Server starter on: ${port} \n`);
}

bootstrap();
