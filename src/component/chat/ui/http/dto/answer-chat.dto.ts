import { ApiProperty } from "@nestjs/swagger";

export class AnswerChatDto {
    @ApiProperty()
    threadId!: string;
  
    @ApiProperty()
    content!: string;
  
    @ApiProperty({ required: false })
    file_ids?: string[];
  
    @ApiProperty({ required: false })
    metadata?: unknown | null;
}  