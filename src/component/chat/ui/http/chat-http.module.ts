import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatApplicationModule } from "../../application/chat-application.module";

@Module({
    imports: [
        ChatApplicationModule,
    ],
    controllers: [ChatController],
    providers: []
})
export class ChatHttpModule {}