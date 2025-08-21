import {
    KeycloakAdminUserService,
    KeycloakCreateUserBuilderService,
} from '@api/shared/modules/keycloak/services';
import { EntityManager } from '@mikro-orm/core';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDto, UserRoDto } from '../../dtos';
import { User } from '../../entites/user.entity';
import { UserCreateCommand } from '../user-create.command';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
    public constructor(
        private readonly em: EntityManager,
        private readonly keycloakService: KeycloakAdminUserService,
        private readonly keycloakCreateUserBuilder: KeycloakCreateUserBuilderService,
    ) {}

    public async execute(command: UserCreateCommand): Promise<UserRoDto> {
        const { userDto } = command;

        const userId = await this.keycloakService.getUserIdByEmail(userDto.email);
        if (userId) {
            throw new ConflictException('User already exists');
        }

        const user = new User();

        // Create Keycloak user
        user.externalAuthId = await this.createKeycloakUser(userDto, user.id);

        await this.em.persistAndFlush(user);

        return {
            id: user.id,
            status: user.status,
        } as UserRoDto;
    }

    /**
     * Create keycloak user
     *
     * @param {UserDto} userDto
     * @param {string} userId
     * @return {Promise<string>}
     */
    private async createKeycloakUser(userDto: UserDto, userId: string): Promise<string> {
        const userData = this.keycloakCreateUserBuilder.build(userDto, userId);

        await this.keycloakService.createUser(userData);

        return await this.keycloakService.getUserIdByEmail(userData.email);
    }
}
