import { Module } from "@nestjs/common";
import { ChatDomainModule } from "../domain/chat-domain.module";
import { CreateThreadHandler } from "./create-thread/create-thread.handler";

@Module({
    imports: [ChatDomainModule],
    providers: [
        CreateThreadHandler,
    ],
})
export class ChatApplicationModule {}