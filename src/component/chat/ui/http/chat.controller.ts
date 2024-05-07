import { Controller, HttpStatus, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse } from "@nestjs/swagger";
import { StartOrAnswerThreadCommand } from "../../application/start-or-answer-thread/start-or-answer-thread.command";

@Controller()
export class ChatController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post('/api/chat')
    @ApiResponse({
        description: 'new chat state',
        status: HttpStatus.OK,
        type: String, //tbd
    })
    async chatAction(
        @Query('threadId', ParseIntPipe) threadId?: number, // wrzucanie threadId jako http query, a body jako buffer wyglada na najbardziej efektywna opcje, ale nie wiem jak z sanityzacja tekstu.
        // W sumie jesli to tylko zadanie, to mozna sie na to wyjebac, i po prostu uzyc class validator+class serializer do dto i elo
    ): Promise<any> {
        const body = '...';
        const result = await this.commandBus.execute(
            new StartOrAnswerThreadCommand(threadId, body)
        );

        /*
        Flow:
        1. if threadId == null, create the new one with standard
        2. 
        */
    }

}