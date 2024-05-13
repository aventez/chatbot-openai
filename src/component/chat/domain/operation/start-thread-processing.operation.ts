import { Either } from "purify-ts";
import { CreateThreadError } from "../error/create-thread.error";
import { Thread } from "openai/resources/beta/threads/threads";
import { StartThreadProcessingError } from "../error/start-thread-processing.error";
import { Run } from "openai/resources/beta/threads/runs/runs";

export interface StartThreadProcessingOperation {
    execute(
        threadId: string
    ): Promise<Either<StartThreadProcessingError, Run>>;
}

export const startThreadProcessingOperationSymbol = Symbol('StartThreadProcessingOperation');