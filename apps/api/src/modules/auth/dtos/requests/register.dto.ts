import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Platform } from '../../enums';

export class RegisterRequestDto {
    @ApiProperty({
        required: true,
        example: 'example@example.com',
        description: 'The user email',
    })
    @IsString()
    @IsEmail()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    readonly email: string;

    @ApiProperty({
        required: true,
        example: 'Some#Password',
        description: 'The user password',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password?: string;

    @ApiProperty({
        required: false,
        example: 'android',
        description: 'The device platform.',
    })
    @IsOptional()
    @IsString()
    readonly devicePlatform: Platform | null;

    @ApiProperty({
        required: false,
        example: 'GFE-Test',
        description: 'The device name.',
    })
    @IsOptional()
    @IsString()
    readonly deviceName?: string | null;
}
