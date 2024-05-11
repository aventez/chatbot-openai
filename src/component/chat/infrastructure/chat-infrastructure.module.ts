import { Module } from '@nestjs/common';
import { ChatOpenAIModule } from './openai/chat.openai.module';

const infrastructureModules = [ChatOpenAIModule];

@Module({
  imports: infrastructureModules,
  exports: infrastructureModules,
})
export class ChatInfrastructureModule {}
