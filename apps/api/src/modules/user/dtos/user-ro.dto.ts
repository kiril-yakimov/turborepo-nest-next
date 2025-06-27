import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRoDto {
    @ApiProperty()
    @Expose()
    readonly id: string;

    @ApiProperty()
    @Expose()
    readonly status: string;
}
