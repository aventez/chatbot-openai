import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateThreadMessage {
    @ApiProperty({ description: 'Content of the message' })
    content!: string;

    @ApiProperty({ description: 'Role of the message author', enum: ['user'] })
    role!: 'user';
}

export class CreateThreadDto {
    @Expose()
    @ApiProperty({
        description: 'Messages in thread',
        type: CreateThreadMessage,
        isArray: true,
        required: false,
    })
    messages?: CreateThreadMessage[];
}