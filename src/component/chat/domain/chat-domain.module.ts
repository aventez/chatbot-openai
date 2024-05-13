import { Module } from "@nestjs/common";
import { ChatInfrastructureModule } from "../infrastructure/chat-infrastructure.module";
import { CreateThreadCase } from "./case/create-thread.case";
import { AnswerChatCase } from "./case/answer-chat.case";

const cases = [CreateThreadCase, AnswerChatCase];

@Module({
    imports: [
        ChatInfrastructureModule,
    ],
    providers: [
        ...cases,
    ],
    exports: [
        ...cases,
    ],
})
export class ChatDomainModule {}