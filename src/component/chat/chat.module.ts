import { Module } from "@nestjs/common";
import { ChatHttpModule } from "./ui/http/chat-http.module";

@Module({
    imports: [ChatHttpModule]
})
export class ChatModule {}