import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class TokenRoDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    access_token: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    expires_in: number;

    @IsString()
    @Expose()
    token_type: string;

    @IsOptional()
    @IsString()
    @Expose()
    id_token?: string;

    @IsString()
    @Expose()
    session_state: string;

    @IsString()
    @Expose()
    scope: string;

    @IsOptional()
    @IsString()
    @Expose()
    refresh_token?: string;

    @IsOptional()
    @IsNumber()
    @Expose()
    refresh_expires_in?: number;
}
