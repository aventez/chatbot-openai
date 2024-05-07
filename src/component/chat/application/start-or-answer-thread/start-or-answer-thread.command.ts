import { Thread } from "../../domain/entity/thread.entity";
import { StartOrAnswerThreadError } from "../../domain/error/start-or-answer-thread.error";
import { Command } from "@nestjs-architects/typed-cqrs";

export class StartOrAnswerThreadCommand extends Command<Thread | StartOrAnswerThreadError> {
    constructor(readonly threadId: number, readonly body: string) {
        super();
    }
}