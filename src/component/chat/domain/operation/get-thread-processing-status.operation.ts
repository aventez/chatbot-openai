import { Either } from "purify-ts";
import { GetThreadProcessingStatusError } from "../error/get-thread-processing-status.error";
import { Run } from "openai/resources/beta/threads/runs/runs";

export interface GetThreadProcessingStatusOperation {
    execute(
        threadId: string,
        runId: string,
    ): Promise<Either<GetThreadProcessingStatusError, Run>>;
}

export const getThreadProcessingStatusOperationSymbol = Symbol('GetThreadProcessingStatusOperation');