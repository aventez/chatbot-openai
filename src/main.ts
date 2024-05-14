import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('app');
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('port');
  const env = configService.get('nodeEnv');

  if (env === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Chatbot')
      .setDescription('OpenAI chatbot')
      .setVersion('1.0')
      .addTag('chatbot')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const documentPath = 'docs';
    SwaggerModule.setup('docs', app, document);
    logger.log(`* Using swagger at /${documentPath}`);
  }

  await app.listen(port, () => {
    logger.log(`* Listening on ::${port}`);
  });
}
bootstrap();
