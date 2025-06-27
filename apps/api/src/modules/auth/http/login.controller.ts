import { LoginDto, TokenRoDto } from '@api/shared/modules/keycloak/dtos';
import { KeycloakAuthUserService } from '@api/shared/modules/keycloak/services';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/login',
    version: '1',
})
export class LoginController {
    public constructor(private readonly keycloakAuthUserService: KeycloakAuthUserService) {}

    @Post()
    public async login(@Body() loginDto: LoginDto): Promise<TokenRoDto | null> {
        return await this.keycloakAuthUserService.directGrantFlow(loginDto);
    }
}
