import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        required: true,
        example: 'example@example.com',
        description: 'The user email',
    })
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    readonly email: string;

    @ApiProperty({
        required: true,
        example: 'Some#Password',
        description: 'The user password',
    })
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;
}
