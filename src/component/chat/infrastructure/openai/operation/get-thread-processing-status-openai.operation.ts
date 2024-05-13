import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Run, RunStatus } from "openai/resources/beta/threads/runs/runs";
import { Either, Left, Right } from "purify-ts";
import { GetThreadProcessingStatusError } from "src/component/chat/domain/error/get-thread-processing-status.error";
import { GetThreadProcessingStatusOperation } from "src/component/chat/domain/operation/get-thread-processing-status.operation";

@Injectable()
export class GetThreadProcessingStatusOpenAIOperation implements GetThreadProcessingStatusOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async execute(threadId: string, runId: string): Promise<Either<GetThreadProcessingStatusError, Run>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            return Right(
                await provider.beta.threads.runs.retrieve(threadId, runId)
            );
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