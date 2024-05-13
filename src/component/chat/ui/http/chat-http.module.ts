import { Module } from "@nestjs/common";
import { ThreadController } from "./controller/thread.controller";
import { ChatApplicationModule } from "../../application/chat-application.module";
import { CqrsModule } from "@nestjs/cqrs";
import { ChatController } from "./controller/chat.controller";

@Module({
    imports: [
        CqrsModule,
        ChatApplicationModule,
    ],
    controllers: [ThreadController, ChatController],
    providers: []
})
export class ChatHttpModule {}