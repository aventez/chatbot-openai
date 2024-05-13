import { Module } from '@nestjs/common';
import { ChatModule } from './component/chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import openaiConfig from './config/openai.config';
import configValidator from './config/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidator,
      validationOptions: {
        allonUnknown: true,
      },
      load: [openaiConfig],
      isGlobal: true,
    }),
    ChatModule
  ],
})
export class AppModule {}
