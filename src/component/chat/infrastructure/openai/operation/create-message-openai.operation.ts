import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Message, MessageCreateParams } from "openai/resources/beta/threads/messages";
import { Either, Left, Right } from "purify-ts";
import { AnswerChatError } from "src/component/chat/domain/error/answer-chat.error";
import { CreateMessageOperation } from "src/component/chat/domain/operation/create-message.operation";

@Injectable()
export class CreateMessageOpenAIOperation implements CreateMessageOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async execute(
        threadId: string, 
        content: string, 
        file_ids: string[],
        metadata: unknown | null
    ): Promise<Either<AnswerChatError, Message>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            const message = await provider.beta.threads.messages.create(threadId, {     
                role: 'user',
                content,
                metadata,
            });
            if (message) {
                return Right(message);
            }
        } catch (err) {
            if (err instanceof OpenAI.APIError) {
                console.log(err);
                switch (err.code) {
                    case 'invalid_api_key':
                        return Left("INVALID_API_KEY")
                    case 'insufficient_funds':
                        return Left("INSUFFICIENT_BALANCE")
                }
            }
        }

        return Left("UNKNOWN_ERROR");
    }
}