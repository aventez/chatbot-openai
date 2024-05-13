import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { MessagesPage } from "openai/resources/beta/threads/messages";
import { Either, Left, Right } from "purify-ts";
import { GetThreadMessagesError } from "src/component/chat/domain/error/get-thread-messages.error";
import { GetThreadMessagesOperation } from "src/component/chat/domain/operation/get-thread-messages.operation";

@Injectable()
export class GetThreadMessagesOpenAIOperation implements GetThreadMessagesOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async execute(threadId: string): Promise<Either<GetThreadMessagesError, MessagesPage>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            const messages = await provider.beta.threads.messages.list(threadId);
            return Right(messages);
        } catch (err) {
            if (err instanceof OpenAI.APIError) {
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