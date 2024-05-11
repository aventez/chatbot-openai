import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { AuthenticationError } from "openai/error";
import { Thread } from "openai/resources/beta/threads/threads";
import { Either, Left, Right } from "purify-ts";
import { CreateThreadError } from "src/component/chat/domain/error/create-thread.error";
import { CreateThreadOperation } from "src/component/chat/domain/operation/create-thread.operation";

export class CreateThreadOpenAIOperation implements CreateThreadOperation {
    private provider: OpenAI;
    
    constructor(
        private readonly configService: ConfigService,
    ) {
        this.provider = new OpenAI({
            apiKey: '123',  //this.configService.getOrThrow('openai.api_key')
        });
    }

    async execute(messages: any): Promise<Either<CreateThreadError, Thread>> {
        try {
            const thread = await this.provider.beta.threads.create({ messages });
            return Right(thread);
        } catch (err) {
            if (err instanceof OpenAI.APIError) {
                /**
                 * 
                 * 400	BadRequestError
                    401	AuthenticationError
                    403	PermissionDeniedError
                    404	NotFoundError
                    422	UnprocessableEntityError
                    429	RateLimitError
                    >=500	InternalServerError
                    N/A	APIConnectionError

                    Trzeba jakos ogarnac rzucanie odpowiedniego errora, moze po body
                 * 
                 */
            } else {
                return Left("UNKNOWN_ERROR");
            }
        }
    }

}