import { Either } from "purify-ts";
import { GetThreadMessagesError } from "../error/get-thread-messages.error";
import { MessagesPage } from "openai/resources/beta/threads/messages";

export interface GetThreadMessagesOperation {
    execute(
        threadId: string
    ): Promise<Either<GetThreadMessagesError, MessagesPage>>;
}

export const getThreadMessagesOperationSymbol = Symbol('GetThreadMessagesOperation');