import { StartOrAnswerThreadCommand } from "./start-or-answer-thread.command";
import { StartOrAnswerThreadCase } from "../../domain/case/start-or-answer-thread.case";
import { StartOrAnswerThreadError } from "../../domain/error/start-or-answer-thread.error";
import { Thread } from "../../domain/entity/thread.entity";
import { IInferredCommandHandler, CommandHandler } from "@nestjs-architects/typed-cqrs";

@CommandHandler(StartOrAnswerThreadCommand)
export class StartOrAnswerThreadHandler implements IInferredCommandHandler<StartOrAnswerThreadCommand> {
    constructor(private readonly useCase: StartOrAnswerThreadCase) {}

    async execute(command: StartOrAnswerThreadCommand): Promise<Thread | StartOrAnswerThreadError> {
        // Tutaj trzeba to przemyslec, bo w mysl CQRSa command nie powinien zwracac outputu, chyba ze np. error ale imo to idiotyczna zasada 
        return this.useCase.execute(command.body, command.threadId);
    }
}