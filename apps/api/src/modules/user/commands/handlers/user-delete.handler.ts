import { KeycloakAdminUserService } from '@api/shared/modules/keycloak/services';
import { EntityManager } from '@mikro-orm/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repositories/user.repository';
import { UserDeleteCommand } from '../user-delete.command';

@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
    constructor(
        private readonly keycloakService: KeycloakAdminUserService,
        private readonly userRepository: UserRepository,
        private readonly em: EntityManager,
    ) {}

    public async execute(command: UserDeleteCommand): Promise<void> {
        const { id } = command;

        const user = await this.userRepository.findOneOrFail({ id });

        this.keycloakService.deleteUser(user.keycloakId);

        await this.em.removeAndFlush(user);
    }
}
