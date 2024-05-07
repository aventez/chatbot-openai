import { UUID } from "crypto"

export type MessageAuthor = 'USER' | 'BOT';

export class Message {
    readonly id: UUID;
    readonly body: string;
    readonly author: MessageAuthor;

    constructor(
        id: UUID,
        body: string,
        author: MessageAuthor,
    ) {
        this.id = id;
        this.body = body;
        this.author = author;
    }
}