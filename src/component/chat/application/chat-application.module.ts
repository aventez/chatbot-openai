import { Module } from "@nestjs/common";
import { ChatDomainModule } from "../domain/chat-domain.module";
import { CreateThreadHandler } from "./create-thread/create-thread.handler";
import { AnswerChatHandler } from "./answer-chat/answer-chat.handler";

@Module({
    imports: [ChatDomainModule],
    providers: [
        CreateThreadHandler,
        AnswerChatHandler,
    ],
})
export class ChatApplicationModule {}