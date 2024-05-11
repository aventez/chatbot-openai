import { Module } from "@nestjs/common";
import { ChatInfrastructureModule } from "../infrastructure/chat-infrastructure.module";
import { CreateThreadCase } from "./case/create-thread.case";

const cases = [CreateThreadCase];

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