import { Either } from "purify-ts";
import { CreateThreadError } from "../error/create-thread.error";
import { Thread } from "openai/resources/beta/threads/threads";

export interface CreateThreadOperation {
    execute(
        messages: any
    ): Promise<Either<CreateThreadError, Thread>>;
}

export const createThreadOperationSymbol = Symbol('CreateThreadOperation');