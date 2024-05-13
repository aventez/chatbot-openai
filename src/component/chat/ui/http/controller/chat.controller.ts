import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateThreadDto } from "../dto/create-thread.dto";
import { CreatedThreadDto } from "../dto/created-thread.dto";
import { CreateThreadCommand } from "src/component/chat/application/create-thread/create-thread.command";
import { InsufficientBalanceException } from "../exception/insufficient-balance.exception";
import { AnswerChatDto } from "../dto/answer-chat.dto";
import { AnswerChatResponseDto } from "../dto/answer-chat-response.dto";
import { AnswerChatCommand } from "src/component/chat/application/answer-chat/answer-chat.command";

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @ApiBody({ type: AnswerChatDto, required: false })
    @ApiResponse({
        description: 'default action for conversation'
    })
    @Post('')
    async answerChatAction(
        @Body() payload?: AnswerChatDto,
    ): Promise<AnswerChatResponseDto> {
        const command = new AnswerChatCommand(payload);
        const answerChatResult = await this.commandBus.execute(command);

        return answerChatResult.caseOf({
            Left: (error): undefined => {
                switch(error) {
                    case 'INSUFFICIENT_BALANCE':
                        throw new InsufficientBalanceException();
                    case 'UNKNOWN_ERROR':
                        throw new InternalServerErrorException();
                }
            },
            Right: (thread) => thread,
        })
    }
}