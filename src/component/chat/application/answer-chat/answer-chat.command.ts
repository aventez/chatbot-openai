import { Command } from "@nestjs-architects/typed-cqrs";

import { Either } from "purify-ts";
import { AnswerChatError } from "../../domain/error/answer-chat.error";
import { AnswerChatResponseDto } from "../../ui/http/dto/answer-chat-response.dto";
import { AnswerChatDto } from "../../ui/http/dto/answer-chat.dto";

export class AnswerChatCommand extends Command<Either<AnswerChatError, AnswerChatResponseDto>> {
    constructor(readonly payload: AnswerChatDto) {
        super();
    }
}