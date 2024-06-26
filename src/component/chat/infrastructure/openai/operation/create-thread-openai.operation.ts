import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { Either, Left, Right } from "purify-ts";
import { CreateThreadError } from "src/component/chat/domain/error/create-thread.error";
import { CreateThreadOperation } from "src/component/chat/domain/operation/create-thread.operation";

@Injectable()
export class CreateThreadOpenAIOperation implements CreateThreadOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async execute(messages: any): Promise<Either<CreateThreadError, Thread>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            const thread = await provider.beta.threads.create({ messages });
            return Right(thread);
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