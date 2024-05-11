import { CommandHandler, IInferredCommandHandler } from "@nestjs-architects/typed-cqrs";
import { CreateThreadCommand } from "./create-thread.command";
import { CreateThreadCase } from "../../domain/case/create-thread.case";
import { Either, Left } from "purify-ts";
import { CreateThreadError } from "../../domain/error/create-thread.error";
import { Thread } from "openai/resources/beta/threads/threads";

@CommandHandler(CreateThreadCommand)
export class CreateThreadHandler implements IInferredCommandHandler<CreateThreadCommand> {
    constructor(private readonly useCase: CreateThreadCase) {}
    
    async execute(command: CreateThreadCommand): Promise<Either<CreateThreadError, Thread>> {
        return this.useCase.execute(command.messages);
    }
}