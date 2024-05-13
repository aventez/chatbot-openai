import { Module } from '@nestjs/common';
import { CreateThreadOpenAIOperation } from './operation/create-thread-openai.operation';
import { createThreadOperationSymbol } from '../../domain/operation/create-thread.operation';
import { createMessageOperationSymbol } from '../../domain/operation/create-message.operation';
import { CreateMessageOpenAIOperation } from './operation/create-message-openai.operation';
import { startThreadProcessingOperationSymbol } from '../../domain/operation/start-thread-processing.operation';
import { StartThreadProcessingOpenAIOperation } from './operation/start-thread-processing-openai.operation';
import { getThreadProcessingStatusOperationSymbol } from '../../domain/operation/get-thread-processing-status.operation';
import { GetThreadProcessingStatusOpenAIOperation } from './operation/get-thread-processing-status-openai.operation';
import { getThreadMessagesOperationSymbol } from '../../domain/operation/get-thread-messages.operation';
import { GetThreadMessagesOpenAIOperation } from './operation/get-thread-messages-openai.operation';
import { submitToolOutputsOperationSymbol } from '../../domain/operation/submit-tool-outputs.operation';
import { SubmitToolOutputsOpenAIOperation } from './operation/submit-tool-outputs-openai.operation';

@Module({
    providers: [
        {
            provide: createThreadOperationSymbol,
            useClass: CreateThreadOpenAIOperation
        },
        {
            provide: createMessageOperationSymbol,
            useClass: CreateMessageOpenAIOperation,
        },
        {
            provide: startThreadProcessingOperationSymbol,
            useClass: StartThreadProcessingOpenAIOperation,
        },
        {
            provide: getThreadProcessingStatusOperationSymbol,
            useClass: GetThreadProcessingStatusOpenAIOperation,
        },
        {
            provide: getThreadMessagesOperationSymbol,
            useClass: GetThreadMessagesOpenAIOperation,
        },
        {
            provide: submitToolOutputsOperationSymbol,
            useClass: SubmitToolOutputsOpenAIOperation,
        }
    ],
    exports: [
        createThreadOperationSymbol,
        createMessageOperationSymbol,
        startThreadProcessingOperationSymbol,
        getThreadProcessingStatusOperationSymbol,
        getThreadMessagesOperationSymbol,
        submitToolOutputsOperationSymbol,
    ]
})
export class ChatOpenAIModule {}
