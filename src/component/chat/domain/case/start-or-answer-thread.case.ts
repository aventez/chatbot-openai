import { Thread } from "../entity/thread.entity";
import { StartOrAnswerThreadError } from "../error/start-or-answer-thread.error";

export class StartOrAnswerThreadCase {
    async execute(body: string, threadId: number): Promise<Thread | StartOrAnswerThreadError> {
        return "UNKNOWN_ERROR"; // should return new Thread state (after AI response)
    }
}