import { CommandHandler, IInferredCommandHandler } from "@nestjs-architects/typed-cqrs";
import { Either } from "purify-ts";
import { AnswerChatCommand } from "./answer-chat.command";
import { AnswerChatError } from "../../domain/error/answer-chat.error";
import { AnswerChatResponseDto } from "../../ui/http/dto/answer-chat-response.dto";
import { AnswerChatCase } from "../../domain/case/answer-chat.case";

@CommandHandler(AnswerChatCommand)
export class AnswerChatHandler implements IInferredCommandHandler<AnswerChatCommand> {
    constructor(private readonly useCase: AnswerChatCase) {}
    
    async execute(command: AnswerChatCommand): Promise<Either<AnswerChatError, AnswerChatResponseDto>> {
        return this.useCase.execute(command.payload);
    }
}