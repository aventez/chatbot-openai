import { Either } from "purify-ts";
import { RunSubmitToolOutputsParams } from "openai/resources/beta/threads/runs/runs";
import { SubmitToolOutputsError } from "../error/submit-tool-outputs.error";

export interface SubmitToolOutputsOperation {
    execute(
        threadId: string,
        runId: string,
        outputs: RunSubmitToolOutputsParams.ToolOutput[],
    ): Promise<Either<SubmitToolOutputsError, void>>;
}

export const submitToolOutputsOperationSymbol = Symbol('SubmitToolOutputsOperation');