import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateThreadDto } from "../dto/create-thread.dto";
import { CreatedThreadDto } from "../dto/created-thread.dto";
import { CreateThreadCommand } from "src/component/chat/application/create-thread/create-thread.command";
import { InsufficientBalanceException } from "../exception/insufficient-balance.exception";

@ApiTags('Threads')
@Controller('threads')
export class ThreadController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @ApiBody({ type: CreateThreadDto, required: false })
    @ApiResponse({
        description: 'returns new thread'
    })
    @Post('')
    async createThreadAction(
        @Body() payload?: CreateThreadDto,
    ): Promise<CreatedThreadDto> {
        const command = new CreateThreadCommand(payload.messages,);
        const createThreadResult = await this.commandBus.execute(command);

        const thread = createThreadResult.caseOf({
            Left: (error): undefined => {
                switch(error) {
                    case 'INSUFFICIENT_BALANCE':
                        throw new InsufficientBalanceException();
                    case 'UNKNOWN_ERROR':
                        throw new InternalServerErrorException();
                }
            },
            Right: (thread) => {
                return thread;
            }
        })

        return CreatedThreadDto.create(
            thread.id,
            thread.created_at,
            thread.metadata,
            thread.object,  
        );
    }

}