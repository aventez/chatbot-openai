import { UUID } from "crypto"
import { Message } from "./message.entity";

export type ThreadStatus = 'PROCESSING' | 'FINISHED';

export class Thread {
    readonly id: UUID;
    readonly messages: Message[];
    readonly status: ThreadStatus;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(
        id: UUID,
        messages: Message[],
        status: ThreadStatus,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.messages = messages;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}