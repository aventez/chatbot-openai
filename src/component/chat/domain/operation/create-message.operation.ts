import { Either } from "purify-ts";
import { AnswerChatError } from "../error/answer-chat.error";
import { Message } from "openai/resources/beta/threads/messages";

export interface CreateMessageOperation {
    execute(
        threadId: string, 
        content: string, 
        file_ids: string[],
        metadata: unknown | null,
    ): Promise<Either<AnswerChatError, Message>>;
}

export const createMessageOperationSymbol = Symbol('CreateMessageOperation');