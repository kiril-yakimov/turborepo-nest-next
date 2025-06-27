import { TokenRoDto } from '@api/shared/modules/keycloak/dtos';
import { KeycloakAuthUserService } from '@api/shared/modules/keycloak/services';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/refresh-token',
    version: '1',
})
export class RefreshController {
    public constructor(private readonly keycloakAuthUserService: KeycloakAuthUserService) {}

    @Post()
    public async refreshToken(
        @Body('refresh_token') refreshToken: string,
    ): Promise<TokenRoDto | null> {
        return await this.keycloakAuthUserService.refreshTokenExchange(refreshToken);
    }
}
