import { Module } from "@nestjs/common";
import { ChatDomainModule } from "../domain/chat-domain.module";
import { StartOrAnswerThreadHandler } from "./start-or-answer-thread/start-or-answer-thread.handler";

@Module({
    imports: [ChatDomainModule],
    providers: [
        StartOrAnswerThreadHandler,
    ]
})
export class ChatApplicationModule {}