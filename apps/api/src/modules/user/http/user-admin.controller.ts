import { RealmRoles } from '@api/shared/modules/keycloak/enums';
import { realmRoleBuilderHelper } from '@api/shared/modules/keycloak/helpers/realm-role-builder.helper';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { UserCreateCommand, UserDeleteCommand } from '../commands';
import { UserDto, UserRoDto } from '../dtos';
import { GetUserQuery } from '../queries';

@ApiTags('User')
@ApiBearerAuth()
@Controller({
    path: 'admin/users',
    version: '1',
})
export class UserAdminController {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get(':id')
    @Roles({ roles: [realmRoleBuilderHelper(RealmRoles.ADMIN)] })
    public async show(@Param('id') id: string): Promise<UserRoDto> {
        try {
            return await this.queryBus.execute(new GetUserQuery(id));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post()
    @Roles({ roles: [realmRoleBuilderHelper(RealmRoles.ADMIN)] })
    public async create(@Body() userDto: UserDto): Promise<UserRoDto> {
        try {
            return await this.commandBus.execute(new UserCreateCommand(userDto));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    @Roles({ roles: [realmRoleBuilderHelper(RealmRoles.ADMIN)] })
    public async destroy(@Param('id') id: string): Promise<void> {
        try {
            await this.commandBus.execute(new UserDeleteCommand(id));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
