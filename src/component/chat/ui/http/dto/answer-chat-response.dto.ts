import { ApiProperty } from "@nestjs/swagger";

export class AnswerChatResponseDto {
  @ApiProperty()
  threadId!: string;

  @ApiProperty()
  content!: string;

  constructor(threadId: string, content: string) {
    this.threadId = threadId;
    this.content = content; 
  }
}
