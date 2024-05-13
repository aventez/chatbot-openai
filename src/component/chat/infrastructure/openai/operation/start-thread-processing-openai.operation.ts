import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import { Either, Left, Right } from "purify-ts";
import { StartThreadProcessingError } from "src/component/chat/domain/error/start-thread-processing.error";
import { StartThreadProcessingOperation } from "src/component/chat/domain/operation/start-thread-processing.operation";

@Injectable()
export class StartThreadProcessingOpenAIOperation implements StartThreadProcessingOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async execute(threadId: string): Promise<Either<StartThreadProcessingError, Run>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            const run = await provider.beta.threads.runs.create(threadId, {
                assistant_id: this.configService.getOrThrow('openai.assistant_id'),
            });
            return Right(run);
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