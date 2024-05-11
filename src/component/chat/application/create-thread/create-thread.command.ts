import { Command } from "@nestjs-architects/typed-cqrs";
import { CreateThreadError } from "../../domain/error/create-thread.error";
import { Thread } from "openai/resources/beta/threads/threads";
import { Either } from "purify-ts";

export class CreateThreadCommand extends Command<Either<CreateThreadError, Thread>> {
    constructor(readonly messages: any) {
        super();
    }
}