import { Module } from '@nestjs/common';
import { CreateThreadOpenAIOperation } from './operation/create-thread-openai.operation';
import { createThreadOperationSymbol } from '../../domain/operation/create-thread.operation';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({}),
    ],
    providers: [
        {
            provide: createThreadOperationSymbol,
            useClass: CreateThreadOpenAIOperation
        }
    ],
    exports: [
        createThreadOperationSymbol,
    ]
})
export class ChatOpenAIModule {}
