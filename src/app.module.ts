import { Module } from '@nestjs/common';
import { ChatModule } from './component/chat/chat.module';

@Module({
  imports: [ChatModule],
})
export class AppModule {}
