import { ApiProperty } from "@nestjs/swagger";

export class CreatedThreadDto {
    @ApiProperty({ description: 'Unique ID' })
    id!: string;

    @ApiProperty({ description: 'Datetime when message was created' })
    created_at!: number;

    @ApiProperty({ description: 'metadata' })
    metadata: unknown | null;

    @ApiProperty()
    object!: 'thread';

    private constructor(
        id: string,
        created_at: number,
        metadata: unknown | null,
        object: 'thread',
    ) {
        this.id = id;
        this.created_at = created_at;
        this.metadata = metadata;
        this.object = object;
    }

    static create(
        id: string,
        created_at: number,
        metadata: unknown | null,
        object: 'thread',
    ): CreatedThreadDto {
        return new CreatedThreadDto(
            id,
            created_at,
            metadata,
            object
        );
    }
}