import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
    @ApiProperty({
        minimum: 0,
        maximum: 10000,
        default: 1,
    })
    @Type(() => Number)
    page: number;

    @ApiProperty({ default: 10 })
    @Type(() => Number)
    limit: number;
}
