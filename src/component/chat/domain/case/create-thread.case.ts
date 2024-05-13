import { Either, Left, Right } from "purify-ts";
import { CreateThreadError } from "../error/create-thread.error";
import { Inject } from "@nestjs/common";
import { CreateThreadOperation, createThreadOperationSymbol } from "../operation/create-thread.operation";
import { Thread } from "openai/resources/beta/threads/threads";

export class CreateThreadCase {
    constructor(
        @Inject(createThreadOperationSymbol)
        private readonly createThreadOperation: CreateThreadOperation,
    ) {}

    // TBD messages in create-thread cant be any
    async execute(messages: any): Promise<Either<CreateThreadError, Thread>> {
        const resultCreateThread = await this.createThreadOperation.execute(messages);
        if (resultCreateThread.isLeft()) {
            return resultCreateThread;
        }

        const thread = resultCreateThread.unsafeCoerce();
        if (thread) {
            return Right(thread);
        }

        return Left('UNKNOWN_ERROR');
    }
}