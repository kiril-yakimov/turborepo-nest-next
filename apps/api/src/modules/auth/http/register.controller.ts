import { UserCreateCommand } from '@api/modules/user/commands';
import { TokenRoDto } from '@api/shared/modules/keycloak/dtos';
import { KeycloakAuthUserService } from '@api/shared/modules/keycloak/services';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { RegisterRequestDto } from '../dtos';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/register',
    version: '1',
})
export class RegisterController {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly keycloakAuthUserService: KeycloakAuthUserService,
    ) {}

    @Post()
    public async registerUser(
        @Body() registerRequestDto: RegisterRequestDto,
    ): Promise<TokenRoDto | null> {
        await this.commandBus.execute(new UserCreateCommand(registerRequestDto));

        return await this.keycloakAuthUserService.directGrantFlow({
            email: registerRequestDto.email,
            password: registerRequestDto.password,
        });
    }
}
