import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get<number>('PORT');
  //const listen_address = app.get(ConfigService).get<string>('LISTEN_ADDRESS'); 
  const api_prefix = app.get(ConfigService).get<string>('API_PREFIX'); 
  const title = app.get(ConfigService).get<string>('TITLE'); 

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(api_prefix || 'v1');
  app.useGlobalPipes((
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  ));
  
  //Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Api services Cost of Fund')
    .setDescription(
      'This API allows to serve as endpoints for cost of fund application.',
    )
    .setVersion('1.0')
    .addTag('BCL Tesorería')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //Llamada en desarrollo "http://localhost:3000/swagger"
  SwaggerModule.setup('swagger', app, document, {
		customSiteTitle: title,
		swaggerOptions: {
			persistAuthorization: true,
			tryItOutEnabled: true,
			displayRequestDuration: true,
		}});

  app.enableCors();
  app.use(json({ limit: '1mb' }));

  await app.listen(port || 3000).then(() => {
      Logger.log('BCL server i\'ts running and ready.')
      // Logger.log('Server i\'ts running in: ' +
      //   `\x1B[32m➜\x1B[0m Local: \x1B[36mhttp://${listen_address}:${port}/${api_prefix} \n \x1B[0m`,
      // );
    }
  );
}
bootstrap();
