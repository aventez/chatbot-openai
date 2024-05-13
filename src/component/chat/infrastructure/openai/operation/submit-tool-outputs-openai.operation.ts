import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Either, Left, Right } from "purify-ts";
import { SubmitToolOutputsError } from "src/component/chat/domain/error/submit-tool-outputs.error";
import { SubmitToolOutputsOperation } from "src/component/chat/domain/operation/submit-tool-outputs.operation";

@Injectable()
export class SubmitToolOutputsOpenAIOperation implements SubmitToolOutputsOperation {   
    constructor(
        private readonly configService: ConfigService,
    ) {}
    
    async execute(
        threadId: string, 
        runId: string, 
        outputs: OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[]
    ): Promise<Either<SubmitToolOutputsError, void>> {
        const provider = new OpenAI({
            apiKey: this.configService.getOrThrow('openai.api_key')
        });

        try {
            await provider.beta.threads.runs.submitToolOutputs(
                threadId,
                runId,
                { tool_outputs: outputs },
            );
            return Right(undefined);
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