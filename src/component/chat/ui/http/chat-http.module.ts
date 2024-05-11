import { Module } from "@nestjs/common";
import { ThreadController } from "./controller/thread.controller";
import { ChatApplicationModule } from "../../application/chat-application.module";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [
        CqrsModule,
        ChatApplicationModule,
    ],
    controllers: [ThreadController],
    providers: []
})
export class ChatHttpModule {}